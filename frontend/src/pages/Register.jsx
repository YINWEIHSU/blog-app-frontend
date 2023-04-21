import React from "react"
import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-xl mb-5">Register</h1>
      <form className="flex flex-col p-5 w-80 gap-y-5">
        <input required className="p-2.5 border-b-2" type="text" placeholder="username" />
        <input required className="p-2.5 border-b-2" type="text" placeholder="email" />
        <input required className="p-2.5 border-b-2" type="password" placeholder="password" />
        <input required className="p-2.5 border-b-2" type="password" placeholder="confirm password" />
        <button className="p-2.5 bg-sky-400 cursor-pointer text-white" type="submit">Register</button>
        <p className="text-xs text-center text-red-700">This is an error message</p>
        <span className="text-xs text-center">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></span>
      </form>
    </div>
  )
}

export default Register