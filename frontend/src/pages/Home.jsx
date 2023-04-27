import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = useState([])
  const category = useLocation().search
  console.log(category)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts${category}`)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [category])

  return (
    <div>
      <div className='mt-12 flex flex-col gap-40'>
        {posts.map(post => (
          <div className='flex gap-20' key={post.id}>
            <div className='grow-2'>
              <img className='w-full max-h-96 object-cover' src={post.image} alt='' />
            </div>
            <div className='grow-3 flex flex-col justify-between'>
              <Link to={`/post/${post.id}`}>
                <h1 className='text-5xl'>{post.title}</h1>
              </Link>
              <p className='text-xl'>{post.desc}</p>
              <button className='w-max py-2.5 text-gray-400 hover:text-black'>Read more...</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
