import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { PostContextProvider } from './context/PostContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <PostContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </PostContextProvider>
  </React.StrictMode>
)
