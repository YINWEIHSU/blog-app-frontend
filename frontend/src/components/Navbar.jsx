import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import PostContext from '../context/PostContext'
import './navbar.scss'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const { categories } = useContext(PostContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div>
      <div className='fixed top-0 left-0 w-screen z-10 py-5 shadow-md'>
        <div className='flex justify-between items-center max-w-md mx-auto'>
          <div className='logo'>
            <Link to='/'>
              WeiWei
            </Link>
          </div>
          <div className='flex items-center gap-5'>
            <Link to='/list' className='nav-item'>
              <h6>最新文章</h6>
            </Link>
            <div onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <Link to='/categories' className='nav-item'>
                <h6>文章類別</h6>
              </Link>
              {dropdownOpen && (
                <div className='dropdown absolute bg-white text-black shadow-md w-48 rounded-lg'>
                  {categories.map((category) => (
                    <Link key={category.id} to={`categories/${category.name}`} className='block px-4 py-2 hover:bg-orange-200' onClick={() => setDropdownOpen(false)}>
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to='/tags' className='nav-item'>
              <h6>標籤分類</h6>
            </Link>
            <Link to='/#' className='nav-item'>
              <h6>關於</h6>
            </Link>

            {currentUser && (
              <>
                <Link to={`/user/${currentUser.id}`} className=' cursor-pointer'>
                  <span>{currentUser?.name}</span>
                </Link>
                <span className='material-symbols-sharp cursor-pointer' onClick={logout}>
                  logout
                </span>
                <span className='font-light hover:text-sky-700'>
                  <Link className='flex justify-center items-center' to='/write'>
                    <span className='material-symbols-sharp'>
                      <span className='material-symbols-sharp'>
                        post_add
                      </span>
                    </span>
                  </Link>
                </span>
              </>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
