import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [getGenres, resultWithGenres] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
      getBooks({ variables: { byGenre: selectedGenre }})
    },
    [selectedGenre, result.data]
  )

  useEffect(() => {
    getGenres()
  }, [resultWithGenres.data])

  if (!props.show) {
    return null
  }

  if (result.loading || resultWithGenres.loading) {
    return <div>
      Loading...
    </div>
  }

  const getAllGenres = () => {
    if (resultWithGenres.loading) return []
    if (!resultWithGenres.data.allBooks) return []
    const genres = new Set()
    resultWithGenres.data.allBooks.forEach(book => book.genres?.forEach(g => genres.add(g)))
    return genres
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenre && <p>in genre <b>{selectedGenre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...getAllGenres()].map((g, index) => (
          <button key={index} onClick={() => setSelectedGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setSelectedGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
