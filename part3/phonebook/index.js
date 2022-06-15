const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

// eslint-disable-next-line no-unused-vars
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res, next) => {
  Person.find({}).then(persons => res.send(`
        <div>
            <p>Phone book has info for ${persons.length} people</p>
            <p>${new Date().toString()}</p>
        </div>
    `))
    .catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person.findById(id)
    .then(person => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const { body } = req

  if (!body.name || !body.number) {
    res.status(400).json({
      error: 'name or number is missing'
    })
    return
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(err => next(err))
})

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' })

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})