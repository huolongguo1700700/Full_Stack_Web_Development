import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBlog, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Notification, Togglable, BlogForm } from './index'

import './Blogs.css'

export default () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject, auth))
      dispatch(
        setNotification(
          {
            message: `A new blog ${blogObject.title} by ${blogObject.author} added`,
          },
          5
        )
      )
    } catch (err) {
      dispatch(setNotification({
        message: 'something happened',
      },
      5))
    }
  }

  return (
    <div>
      <h2>Blogs app</h2>
      <Notification />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {[...blogs]?.sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div className='blog' key={blog.id}>
            <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  )
}