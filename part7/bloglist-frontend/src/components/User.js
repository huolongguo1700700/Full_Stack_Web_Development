import React from 'react'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

export default () => {
  const users = useSelector(state => state.users)
  const match = useMatch('/users/:id')
  const user = match ? users?.find((user) => user.id === match.params.id) : null

  return (
    <>
      {user &&
        <>
          <h1>{user.username}</h1>
          <h2>added blogs</h2>
          {user.blogs?.map(blog => (
            <ul key={blog.id}>
              <li>{blog.title}</li>
            </ul>
          ))}
        </>
      }
    </>
  )
}
