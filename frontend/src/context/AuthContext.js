import { createContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

  const register = async (input) => {
    await axios.post("/auth/register", input)
  }

  const login = async (input) => {
    const res = await axios.post("/auth/login", input)
    setCurrentUser(res.data.user)
  }
  const logout = async (input) => {
    await axios.post("/auth/logout")
    setCurrentUser(null)
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{currentUser, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
export default AuthContext
