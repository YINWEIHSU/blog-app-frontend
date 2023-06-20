import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './context/AuthContext'
import Home from './pages/Home'
import List from './pages/List'
import Login from './pages/Login'
import Register from './pages/Register'
import Single from './pages/Single'
import Write from './pages/Write'
import Categories from './pages/Categories'
import Tags from './pages/Tags'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import User from './pages/User'

function RequireAuth ({ children }) {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  if (!currentUser) {
    navigate('/')
    return
  }
  return children
}
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='pt-32'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/list',
        element: <List />
      },
      {
        path: '/post/:slug',
        element: <Single />
      },
      {
        path: '/write',
        element: <RequireAuth><Write /></RequireAuth>
      },
      {
        path: '/categories',
        element: <Categories />
      },
      {
        path: '/categories/:categoryName',
        element: <List />
      },
      {
        path: '/tags',
        element: <Tags />
      },
      {
        path: '/tags/:tagName',
        element: <List />
      },
      {
        path: '/user/:id',
        element: <RequireAuth><User /></RequireAuth>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

function App () {
  return (
    <div className='flex justify-center'>
      <div className='max-w-md w-full'>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
