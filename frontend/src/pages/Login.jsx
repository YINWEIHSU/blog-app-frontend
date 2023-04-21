import React from "react"
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-xl mb-5">Login</h1>
      <form className="flex flex-col p-5 w-80 gap-y-5">
        <input className="p-2.5 border-b-2" type="text" placeholder="username" />
        <input className="p-2.5 border-b-2" type="password" placeholder="password" />
        <button className="p-2.5 bg-sky-400 cursor-pointer text-white" type="submit">Login</button>
        <p className="text-xs text-center text-red-700">This is an error message</p>
        <span className="text-xs text-center">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></span>
      </form>
    </div>
  )
}

export default Login