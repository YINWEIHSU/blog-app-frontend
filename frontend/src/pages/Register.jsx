import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(null)
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setError(null)
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.password !== input.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      await register(input)
      navigate('/login')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-xl mb-5'>Register</h1>
      <form className='flex flex-col p-5 w-80 gap-y-5'>
        <input required className='p-2.5 border-b-2' type='text' placeholder='username' name='name' onChange={handleChange} />
        <input required className='p-2.5 border-b-2' type='text' placeholder='email' name='email' onChange={handleChange} />
        <input required className='p-2.5 border-b-2' type='password' placeholder='password' name='password' onChange={handleChange} />
        <input required className='p-2.5 border-b-2' type='password' placeholder='confirm password' name='confirmPassword' onChange={handleChange} />
        <button className='p-2.5 bg-sky-400 cursor-pointer text-white' onClick={handleSubmit}>Register</button>
        {error && <p className='text-xs text-center text-red-700'>{error}</p>}
        <span className='text-xs text-center'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register
