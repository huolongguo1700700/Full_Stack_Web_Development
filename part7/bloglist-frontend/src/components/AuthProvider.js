import React from 'react'
import { useSelector } from 'react-redux'

let AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const user = useSelector(state => state.user)

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export default AuthProvider