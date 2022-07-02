import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBooks from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const client = useApolloClient()

  const sendMessage = (message) => {    
    setMessage(message)    
    setTimeout(() => {      
      setMessage(null)    
    }, 10000)  
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      sendMessage(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem('token')
    if (!tokenLocalStorage) return
    setToken(tokenLocalStorage)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notification message={message} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={sendMessage}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notification message={message} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBooks show={page === 'add'} sendMessage={sendMessage} />

      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App