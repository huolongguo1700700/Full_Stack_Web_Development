import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const onVote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted ${anecdote.content}`, 5)
  }

  return (
    <>
      {props.anecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => onVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)