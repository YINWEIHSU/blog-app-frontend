import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Menu = ({ category, currentPostId }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${category}`)
        res.data = res.data.filter(post => post.id !== currentPostId).slice(0, 3)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [category, currentPostId])
  return (
    <div className='menu flex flex-col gap-6'>
      <h1 className='text-2xl'>
        相關文章
      </h1>
      <ol>
        {posts.map((post, index) => (
          <li className='post flex flex-col pl-5' key={post.id}>
            <Link to={`/post/${post.slug}`}>
              <h2 className='text-xl text-orange-800 my-1'>{index + 1}. {post.title}</h2>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Menu
