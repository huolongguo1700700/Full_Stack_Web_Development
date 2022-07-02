import React from 'react'
import { useQuery  } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYear from './BirthYear'

const Authors = ({show, sendMessage}) => {
  const { loading, data, error } = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {data.allAuthors?.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <BirthYear authors={data.allAuthors} sendMessage={sendMessage} />
    </div>
  )
}

export default Authors
