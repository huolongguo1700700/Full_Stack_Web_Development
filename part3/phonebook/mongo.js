/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://testi:${password}@cluster0.8kipm0u.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    if (process.argv.length === 3) {
      Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(p => console.log(`${p.name} ${p.number}`))
        return mongoose.connection.close()
      })

      return
    }

    if (!process.argv[3] || !process.argv[4]) return mongoose.connection.close()

    const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
    })

    return person.save().then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
      return mongoose.connection.close()
    })
  })
  .catch((err) => console.log(err))