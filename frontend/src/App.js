import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
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
        element: <Write />
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
