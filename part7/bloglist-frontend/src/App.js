import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginForm, Users, RequireAuth, User, Blogs, Blog, Navigation } from './components'

import AuthProvider from './components/AuthProvider'

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={
            <RequireAuth>
              <Blogs />
            </RequireAuth>
          } />
          <Route path='/blogs/:id' element={
            <RequireAuth>
              <Blog />
            </RequireAuth>
          } />
          <Route path='/users' element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          } />
          <Route path='/users/:id' element={
            <RequireAuth>
              <User />
            </RequireAuth>
          } />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
