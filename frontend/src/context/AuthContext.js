import { createContext, useEffect, useState, useContext } from 'react'
import api from '../api'
import PostContext from './PostContext'

const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  const { getPosts } = useContext(PostContext)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('access_token')) || null)

  const register = async (input) => {
    await api.post('/auth/register', input)
  }

  const login = async (input) => {
    const res = await api.post('/auth/login', input)
    setCurrentUser(res.data.user)
    await getPosts()
  }
  const logout = async (input) => {
    await api.post('/auth/logout')
    setCurrentUser(null)
    await getPosts()
  }
  const getCurrentUser = async () => {
    const res = await api.get('/auth/current_user')
    setCurrentUser(res.data)
  }
  const updateUser = async (input) => {
    const res = await api.put(`/users/update/${input.id}`, input)
    setCurrentUser(res.data)
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, getCurrentUser, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
export default AuthContext
