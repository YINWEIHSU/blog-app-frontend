import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const Layout = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className='pt-32'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
