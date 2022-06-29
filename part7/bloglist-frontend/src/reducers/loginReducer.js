import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const blogAuth = JSON.parse(
  window.localStorage.getItem('blogToken'),
)

const initialState = blogAuth ? blogAuth : null

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      return action.payload
    },
    logout: () => {
      window.localStorage.setItem('blogToken', null)
      return null
    }
  }
})

export const { setAuth, logout } = loginSlice.actions

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('blogToken', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setAuth(user))
  }
}

export default loginSlice.reducer