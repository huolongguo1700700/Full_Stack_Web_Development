import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import Togglable from './Togglable'

const LoginForm = () => {
  const navigate = useNavigate()
  const location = useLocation()

  let from = location.state?.from?.pathname || '/home'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      dispatch(setNotification({ message: 'Please fill username asn password' }, 5))
    }
    try {
      await dispatch(login(username, password))
      navigate(from, { replace: true })
    }
    catch (err) {
      setNotification({ message: 'wrong credential' }, 5)
    }
  }

  return (
    <Togglable buttonLabel='login'>
      <h2>Login</h2>
      <Notification />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value) }
          />
        </div>
        <div>
           password
          <input
            id='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </Togglable>
  )
}

export default LoginForm