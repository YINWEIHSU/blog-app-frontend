import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import List from '../pages/List'
import Single from '../pages/Single'
import Write from '../pages/Write'
import Categories from '../pages/Categories'
import Tags from '../pages/Tags'
import User from '../pages/User'
import RequireAuth from '../components/RequireAuth'
import Login from '../pages/Login'

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
      },
      {
        path: '*',
        element: <h1>Page Not Found</h1>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router
