import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import { setAuth } from '../reducers/loginReducer'
import blogServices from '../services/blogs'
import { initializeBlogs } from '../reducers/blogReducer'

export default ({ children }) => {
  const location = useLocation()
  const auth = useSelector(state => state.auth)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogToken')
    if (loggedUserJSON) {
      console.log('here')
      const user = JSON.parse(loggedUserJSON)
      setAuth(user)
      blogServices.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (!user) return
    window.localStorage.setItem('blogToken', JSON.stringify(user))
    blogServices.setToken(user.token)
  }, [user])

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}