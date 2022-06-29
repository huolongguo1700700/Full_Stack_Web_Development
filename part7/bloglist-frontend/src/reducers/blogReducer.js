import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    expandBlog: (state, action) => {
      state.push(action.payload)
    },
    updateLikeBlog: (state, action) => {
      const likedBlog = state.find(blog => blog.id === action.payload)
      if (!likedBlog) return state

      const updatedBlog = {
        ...likedBlog,
        likes: likedBlog.likes + 1
      }

      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    },
    removeBlog: (state, action) => {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const { setBlogs, expandBlog, updateLikeBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (data, user) => {
  return async (dispatch) => {
    let newBlog = await blogService.create(data)
    newBlog = { ...newBlog, user: { name: user.name } }
    dispatch(expandBlog(newBlog))
  }
}

export const likeBlog = (id, likedBlog) => {
  return async (dispatch) => {
    await blogService.update(id, likedBlog)
    dispatch(updateLikeBlog(id))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer