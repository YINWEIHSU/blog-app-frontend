import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PostContext from '../context/PostContext'

const Tags = () => {
  const { tags } = useContext(PostContext)

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl'>所有標籤</h2>
      <p className=' mt-5'>共{tags.length}種</p>
      <div className='flex gap-4 flex-wrap justify-center my-5'>
        {tags.map(tag => (
          <Link key={tag.id} to={`/tags/${tag.name}`} className='text-3xl text-gray-700 flex-shrink-0'>{tag.name}</Link>))}
      </div>
    </div>
  )
}

export default Tags
