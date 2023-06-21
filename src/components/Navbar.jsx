import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import PostContext from '../context/PostContext'
import './navbar.scss'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const { categories } = useContext(PostContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sidebarRef = useRef()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div>
      <div ref={sidebarRef} className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className='sidebar-menu fixed h-screen w-64 z-20 py-5 flex flex-col items-start'>
          <div className='sidebar-close absolute top-0 right-0 mr-4 mt-4 cursor-pointer' onClick={toggleSidebar}>
            <span className='material-symbols-sharp'>
              close
            </span>
          </div>
          <div className='sidebar-button flex flex-col gap-5 px-5 pt-15'>
            <Link onClick={toggleSidebar} to='/list' className='sidebar-item'>
              <h6>最新文章</h6>
            </Link>

            <Link onClick={toggleSidebar} to='/categories' className='sidebar-item'>
              <h6>文章類別</h6>
            </Link>
            <Link onClick={toggleSidebar} to='/tags' className='sidebar-item'>
              <h6>標籤分類</h6>
            </Link>
            <Link onClick={toggleSidebar} to='/#' className='sidebar-item'>
              <h6>關於</h6>
            </Link>

            {currentUser && (
              <>
                <Link onClick={toggleSidebar} to={`/user/${currentUser.id}`} className=' cursor-pointer'>
                  <span>{currentUser?.name}</span>
                </Link>
                <h6
                  className='sidebar-item cursor-pointer' onClick={() => {
                    logout()
                    toggleSidebar()
                  }}
                >登出
                </h6>
                <Link onClick={toggleSidebar} to='/write' className='sidebar-item'>
                  <h6>新增文章</h6>
                </Link>
              </>)}
          </div>
        </div>
      </div>
      <div className='navbar fixed top-0 left-0 w-screen z-10 py-5 shadow-md'>
        <div className='nav-body flex justify-between items-center max-w-md mx-auto'>
          <div onClick={toggleSidebar} className='sidebar-trigger'>
            <span className='material-symbols-sharp'>
              menu
            </span>
          </div>
          <div className='logo'>
            <Link to='/'>
              WeiWei
            </Link>
          </div>
          <div className='nav-button flex items-center gap-5'>
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
