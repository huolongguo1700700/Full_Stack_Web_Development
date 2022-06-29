import React, { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import styled from 'styled-components'

const BlogDiv = styled.div`
  padding-top: 10px;
  padding-left: 2px;
  border: solid;
  border-width: 1px;
  margin-bottom: 5px;
`

export default () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  const [view, setView] = useState(false)

  const onUpdateLike = async () => {
    try {
      const updatingBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      }
      await dispatch(likeBlog(blog.id, updatingBlog))
    }
    catch (err) {
      dispatch(setNotification({
        message: `${err.toString()}`
      }, 5))
    }
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await dispatch(deleteBlog(blog.id))
      navigate('/', { replace: true })
    }
  }

  return (
    <BlogDiv>
      <p>{blog?.title} {blog?.author}
        <button onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
      </p>
      {
        view
        && <div>
          <p>{blog?.url}</p>
          <p id='noLikes'>{blog?.likes} <button id='like-btn' onClick={onUpdateLike}>like</button></p>
          <p>{blog?.author}</p>
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </div>
      }
    </BlogDiv>
  )
}
