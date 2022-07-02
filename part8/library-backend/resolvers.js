const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const JWT_SECRET = process.env.JWT_SECRET
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments,
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return null

        if (!args.genre) return Book.find({ author: author.id }).populate('author')

        return Book.find({ author: author.id, genres: { $in: args.genre }}).populate('author')
      }

      if (args.genre) {
        return Book.find({ genres: { $in: args.genre }}).populate('author')
      }
  
      return Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: author.id })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser) {
        throw new AuthenticationError('Unauthorized')
      }
      try {
        const author = await Author.findOne({ name: args.author })

        if (author) {
          const book = new Book({ ...args, author: author })
          await book.save()
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
        }
        else {
          const author = new Author({ name: args.author })
          await author.save()

          const book = new Book({ ...args, author: author })
          await book.save()

          pubsub.publish('BOOK_ADDED', { bookAdded: book })
        }
      }
      catch (err) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Unauthorized')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      try {
        await Author.updateOne(
          { name: args.name},
          {
            $set: {
              born: args.setBornTo
            }
          }
        )
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }

      return Author.findOne({ name: args.name })
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers