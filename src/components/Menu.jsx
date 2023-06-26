import { useState, useContext, useEffect } from 'react'
import PostContext from '../context/PostContext'
import { Link } from 'react-router-dom'

const Menu = ({ currentPost }) => {
  const { posts } = useContext(PostContext)
  const [filteredPosts, setFilteredPosts] = useState([])
  const displayPostNum = 3
  function jaccardIndex (array1, array2) {
    const set1 = new Set(array1?.map(item => item.id))
    const set2 = new Set(array2?.map(item => item.id))

    const intersection = new Set([...set1].filter(item => set2.has(item)))
    const union = new Set([...set1, ...set2])

    return intersection.size / union.size
  }

  useEffect(() => {
    let filteredPosts = posts
      .map(post => ({
        ...post,
        jaccardIndex: jaccardIndex(post.tags, currentPost.tags)
      }))
      .filter(post => post.id !== currentPost.id && post.jaccardIndex > 0)
      .sort((a, b) => b.jaccardIndex - a.jaccardIndex)
      .slice(0, displayPostNum)

    if (!filteredPosts.length) {
      const currentPostCategoryId = posts.find(post => post.id === currentPost.id)?.categoryId
      filteredPosts = posts
        .filter(post => post.categoryId === currentPostCategoryId && post.id !== currentPost.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, displayPostNum)
    }

    setFilteredPosts(filteredPosts)
  }, [currentPost, posts])

  return (
    <div className='menu flex flex-col gap-6'>
      <h1 className='text-2xl'>
        相關文章
      </h1>
      <ol>
        {filteredPosts.map((post, index) => (
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
