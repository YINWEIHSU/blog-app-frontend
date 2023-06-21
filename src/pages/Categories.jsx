import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PostContext from '../context/PostContext'

const Categories = () => {
  const { categories } = useContext(PostContext)

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl'>所有分類</h2>
      <p className=' mt-5'>共{categories.length}種</p>
      <div className='flex gap-4 flex-wrap justify-center my-5'>
        {categories.map(category => (
          <Link key={category.id} to={`/categories/${category.name}`} className='text-3xl text-gray-700 flex-shrink-0'>{category.name}</Link>))}
      </div>
    </div>
  )
}

export default Categories
