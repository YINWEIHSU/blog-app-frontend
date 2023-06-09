import { createContext, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import PostContext from './PostContext'

const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  const { getPosts } = useContext(PostContext)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('access_token')) || null)

  const register = async (input) => {
    await axios.post('/auth/register', input)
  }

  const login = async (input) => {
    const res = await axios.post('/auth/login', input)
    setCurrentUser(res.data.user)
    await getPosts()
  }
  const logout = async (input) => {
    await axios.post('/auth/logout')
    setCurrentUser(null)
    await getPosts()
  }
  const getCurrentUser = async () => {
    const res = await axios.get('/auth/current_user')
    setCurrentUser(res.data)
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
export default AuthContext
