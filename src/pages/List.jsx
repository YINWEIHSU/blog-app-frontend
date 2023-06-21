import { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './list.scss'
import PostContext from '../context/PostContext'

const List = () => {
  const { posts, categories, tags } = useContext(PostContext)
  const location = useLocation()
  let category = null
  let tag = null

  const subRoute = location.pathname.split('/')[1]

  if (subRoute === 'categories') {
    category = categories.find(category => category.name === decodeURIComponent(location.pathname.split('/')[2]))
  }
  if (subRoute === 'tags') {
    tag = tags.find(tag => tag.name === decodeURIComponent(location.pathname.split('/')[2]))
  }

  let filteredPosts = posts

  if (category) {
    filteredPosts = posts.filter(post => post.category_id === category.id)
  }
  if (tag) {
    filteredPosts = posts.filter(post => post.tags.some(postTag => postTag.id === tag.id))
  }

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 15

  const groupPostsByYear = (posts) => {
    return posts.reduce((groups, post) => {
      const date = new Date(post.createdAt)
      const yearKey = `${date.getFullYear()}`
      if (!groups[yearKey]) {
        groups[yearKey] = []
      }
      groups[yearKey].push(post)
      return groups
    }, {})
  }

  const paginatedPosts = filteredPosts?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  const postsByYear = groupPostsByYear(paginatedPosts)

  return (
    <section id='archive' className='archive'>
      {category && <div>文章類別：{category.name}</div>}
      {tag && <div>標籤：{tag.name}</div>}
      {!filteredPosts.length && <div>沒有文章</div>}
      {Object.entries(postsByYear)
        .sort(([a], [b]) => b - a)
        .map(([year, posts]) => (
          <div key={year}>
            <div className='collection-title my-3'>
              <h2 className='archive-year text-2xl'>{year}</h2>
            </div>
            {posts.map(post => (
              <Link key={post.id} to={`/post/${post.slug}`}>
                <div className='archive-post border-l-2 py-2 px-5 flex gap-3 text-lg hover:border-l-4 hover:border-amber-600' key={post.id}>
                  <span className='archive-post-time whitespace-nowrap'>
                    {post.createdAt?.slice(5, 10)}
                  </span>
                  <span className='archive-post-title text-amber-600 hover:text-amber-800'>
                    {post.status === 'draft' ? '(草稿) ' : ''}
                    {post.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ))}
      <nav className='flex justify-between text-lg my-8'>
        <div>
          {currentPage > 1 && (
            <div className='flex align-center left' onClick={() => setCurrentPage(currentPage - 1)}>
              <span className='material-symbols-sharp'>
                chevron_left
              </span><span>上一頁</span>
            </div>
          )}
        </div>
        <div>
          {currentPage < Math.ceil(filteredPosts.length / postsPerPage) && (
            <div className='flex align-center right' onClick={() => setCurrentPage(currentPage + 1)}>
              <span>下一頁</span>
              <span className='material-symbols-sharp'>
                chevron_right
              </span>
            </div>
          )}
        </div>
      </nav>
    </section>
  )
}

export default List
