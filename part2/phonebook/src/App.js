import { useState, useEffect } from 'react'

import { Filter, PersonForm, Person, Message } from './components'
import client from './client/index'
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [message, setMessage] = useState()

  const onSubmit = (e) => {
    e.preventDefault();

    if (!newName) return

    const existedPerson = persons.find(p => p.name === newName)
    if (existedPerson) {
      const confirmDialog = window.confirm(`${existedPerson.name} is already added to phonebook, replace old number with a new one?`)

      if (!confirmDialog) return

      const updatePerson = { ...existedPerson, number: newPhoneNumber }
      client.update(updatePerson.id, updatePerson)
        .then(res => {
          setPersons(
            persons.map(p => p.id === existedPerson.id ? res : p)
          )
          setMessage({
            message: `${updatePerson.name} updated successfully`,
            classes: 'success'
          })
        })
        .catch((err) => setMessage({
          message: err.response.data.error,
          classes: 'error'
        }))

      setNewName('')
      setNewPhoneNumber('')
      return
    }

    const newPerson = {
      name: newName,
      number: newPhoneNumber,
      id: persons.length + 1
    }

    client.create(newPerson).then(res => {
      setPersons(persons.concat(res))

      // Reset input fields
      setNewName('')
      setNewPhoneNumber('')

      setMessage({
        message: `${newPerson.name} added`,
        classes: 'success'
      })
    })
    .catch((err) => setMessage({
      message: err.response.data.error,
      classes: 'error'
    }))
  }

  useEffect(
    () => {
      client.getAll()
        .then(setPersons)
        .catch(() => setPersons([]))
    },
    []
  )

  const onDeletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDialog = window.confirm(`Delete ${person.name} ?`)
    if (!confirmDialog) return;

    client.deletePerson(id).then(
      () => setPersons(
        persons.filter(p => p.id !== id)
      )
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message?.message} classes={message?.classes} />
      <Filter persons={persons} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={onSubmit}
        setNewName={setNewName}
        setNewPhoneNumber={setNewPhoneNumber}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
      />
      <h2>Numbers</h2>
      <Person persons={persons} onDeletePerson={onDeletePerson}/>
    </div>
  )
}

export default App
