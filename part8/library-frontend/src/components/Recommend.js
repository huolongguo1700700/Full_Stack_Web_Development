import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const user = useQuery(ME)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (!user.loading)
    getBooks({ variables: { byGenre: user.data.me.favoriteGenre }})
  },[user.data, result.data])

  if (!show) return null

  if (result.loading) return (
    <div>
        Loading
    </div>
  )

  return (
    <div>
      <p>
        books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a, index) => (
            <tr key={index}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend