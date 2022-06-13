import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(
    Math.floor((Math.random() * anecdotes.length)))

  const [votes, setVotes] = useState(
    Array(anecdotes.length).fill(0)
  )

  const [mostVoted, setMostVoted] = useState(0)

  const getRandomNumber = () => {
    let rand = Math.floor((Math.random() * anecdotes.length));

    while (rand === selected) {
      rand = Math.floor((Math.random() * anecdotes.length));
    }

    return rand;
  }

  const upVote = () => {
    let voting = [...votes];
    voting[selected]++;
    setVotes(voting) 
  }

  useEffect(
    () => {
      const maxVote = Math.max(...votes)
      if (maxVote === mostVoted) return;
      setMostVoted(
        votes.indexOf(maxVote)
      )
    },
    [votes, mostVoted]
  )

  return (
    <>
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={upVote}>vote</button>
      <button onClick={() => setSelected(getRandomNumber())}>next anecdote</button>
    </div>
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {votes[mostVoted]} votes</p>
    </div>
    </>
  )
}

export default App