import { createSlice } from '@reduxjs/toolkit'
import anecdotesServices from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote (state, action) {
      const id = action.payload
      const votingObj = state.find(v => v.id === id)
      if (!votingObj) return
      const updatedObj = {
        ...votingObj,
        votes: votingObj.votes + 1
      }

      return state
        .map(obj => obj.id === id ? updatedObj : obj)
        .sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, createNew, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = votedAnecdote => {
  return async (dispatch) => {
    const anecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1
    }

    const updatedAnecdote = await anecdotesServices.update(anecdote)
    const { id } = updatedAnecdote
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer