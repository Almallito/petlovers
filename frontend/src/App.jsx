import React from 'react'
import Routes from './routes'

import './global.css'

import { AuthProvider } from './contexts/Auth'
import { RequestsProvider } from './contexts/Requests'


const App = () => {
  return (
    <AuthProvider>
      <RequestsProvider>
        <Routes />
      </RequestsProvider>
    </AuthProvider>
  )
}

export default App;
