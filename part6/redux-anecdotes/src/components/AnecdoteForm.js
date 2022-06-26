import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote, asObject } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const onCreateNew = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(asObject(content))
    props.setNotification(`Added ${content} successfully`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onCreateNew}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)