import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)

  return (
    <div>
      <div className='flex justify-between items-center py-2.5'>
        <div><Link to="/">Logo</Link></div>
        <div className='flex items-center gap-2.5'>
          <Link to='/?cat=life'>
            <h6 className='text-base font-light'>Life</h6>
          </Link>
          <Link to='/?cat=work'>
            <h6 className='text-base font-light'>Work</h6>
          </Link>
          <Link to='/?cat=coding'>
            <h6 className='text-base font-light'>Coding</h6>
          </Link>
          <span className='cursor-pointer'>{currentUser?.name}</span>
          {currentUser ? <span className='cursor-pointer' onClick={logout}>Logout</span> : <Link className='cursor-pointer' to='/login'>Login</Link>}
          <span className='bg-sky-200 h-10 w-10 rounded-full font-light flex justify-center items-center hover:text-sky-700 hover:bg-transparent'>
            <Link to='/write'>Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
