import { gql  } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
`

export const ALL_BOOKS = gql`
query getAllBooks($byAuthor: String, $byGenre: String){
  allBooks(author: $byAuthor, genre: $byGenre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`

export const EDIT_BORN_YEAR = gql`
mutation editAuthorBornYear($name: String!, $setBornTo: Int!){
  editAuthor(
    name: $name, 
    setBornTo: $setBornTo
    ) {
      name
      born
  }
}
`