import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNoti: (state, action) => {
      clearTimeout(state.timePeriod)
      return action.payload.message
    },
    removeNoti: () => {
      return {
        message: ''
      }
    }
  }
})

export const { setNoti, removeNoti } = notificationSlice.actions

export const setNotification = (message, timePeriod) => {
  return async dispatch => {
    dispatch(setNoti({
      message: {
        message: message
      },
      timePeriod: setTimeout(() => {
        dispatch(removeNoti())
      }, timePeriod * 1000)
    }))
  }
}

export default notificationSlice.reducer