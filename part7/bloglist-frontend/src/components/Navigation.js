import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { NavLink, useNavigate } from 'react-router-dom'

export default () => {
  const auth = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    dispatch(logout())
    navigate('/')
  }

  if (auth) {
    return (
      <nav>
        <span>
          <NavLink to={'/'}>
              blogs
          </NavLink>
        </span>
        <span style={{ margin: 5 }}>
          <NavLink to={'/users'}>
              users
          </NavLink>
        </span>
        <span>{auth?.name} logged in</span>
        <button
          onClick={handleLogout}
          type='button'
        >
            Logout
        </button>
      </nav>
    )
  } else {
    return null
  }
}
