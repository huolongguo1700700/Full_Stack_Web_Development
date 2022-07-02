import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {    
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (!result.data) return
    setToken(result.data.login.value)
    localStorage.setItem('token', result.data.login.value)
  }, [result.data])

  const onSubmit = (event) => {
    event.preventDefault()

    login({ variables: { username, password }})
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          username <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm