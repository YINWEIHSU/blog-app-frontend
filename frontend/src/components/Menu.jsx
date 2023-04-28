import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Menu = ({ category, currentPostId }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${category}`)
        res.data = res.data.filter(post => post.id !== currentPostId)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [category, currentPostId])
  return (
    <div className='menu grow-2 flex flex-col gap-6'>
      <h1>Other posts</h1>
      {posts.map(post => (
        <div className='post flex flex-col gap-2.5' key={post.id}>
          <img className='h-48 w-full object-cover' src={post.image} alt='' />
          <h2 className='text-3xl text-gray-700'>{post.title}</h2>
          <Link to={`/post/${post.id}`}>
            <button className='w-max py-2.5 text-gray-400 hover:text-black'>Read more...</button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Menu
