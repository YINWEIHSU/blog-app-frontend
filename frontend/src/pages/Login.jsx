import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setError(null)
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(input)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-xl mb-5'>Login</h1>
      <form className='flex flex-col p-5 w-80 gap-y-5'>
        <input className='p-2.5 border-b-2' type='text' placeholder='email' name='email' onChange={handleChange} />
        <input className='p-2.5 border-b-2' type='password' placeholder='password' name='password' onChange={handleChange} />
        <button className='p-2.5 bg-sky-400 cursor-pointer text-white' onClick={handleSubmit}>Login</button>
        {error && <p className='text-xs text-center text-red-700'>{error}</p>}
        <span className='text-xs text-center'>Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link></span>
      </form>
    </div>
  )
}

export default Login
