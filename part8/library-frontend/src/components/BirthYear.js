import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BORN_YEAR, ALL_AUTHORS } from '../queries'

export const BirthYear = ({ authors, sendMessage }) => {
  const [nameOpt, setNameOpt] = useState('')
  const [bornTo, setBornTo] = useState('')

  const [editBornYear] = useMutation(EDIT_BORN_YEAR,
    {
      refetchQueries: [
        { query: ALL_AUTHORS }
      ],
      onError: (error) => {
        sendMessage(error.graphQLErrors[0].message)
      }
    })

    const submit = (event) => {
      event.preventDefault()
  
      const name = nameOpt
  
      editBornYear({ variables: { name: name, setBornTo: bornTo } })
      setNameOpt('')
      setBornTo('')
    }    

    return (
      <div>
        <h2>Set birthyear</h2>
  
        <form onSubmit={submit}>
          <div>
            name <select value={nameOpt} onChange={(e) => setNameOpt(e.target.value)}>
              <option value={''}></option>
              {authors.map((author, index) => (
                <option key={`${index}-${author.name}`} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            born <input
              value={bornTo}
              onChange={(e) => setBornTo(parseInt(e.target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    )
}

export default BirthYear