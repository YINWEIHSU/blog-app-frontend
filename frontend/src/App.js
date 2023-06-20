import { RouterProvider } from 'react-router-dom'
import router from './router'

function App () {
  return (
    <div className='flex justify-center'>
      <div className='max-w-md w-full px-5'>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
