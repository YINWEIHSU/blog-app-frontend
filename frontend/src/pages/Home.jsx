import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import PostContext from '../context/PostContext'
import MDEditor from '@uiw/react-md-editor'
import './home.scss'

const Home = () => {
  const { posts } = useContext(PostContext)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10
  const paginatedPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  return (
    <div className='home'>
      <div data-color-mode='light' className='mt-12 flex flex-col gap-20'>
        {paginatedPosts.map(post => (
          <div className='flex flex-col gap-10 border-b-2' key={post.id}>
            <MDEditor.Markdown className='mde-ellipsis' source={post.content} style={{ whiteSpace: 'pre-wrap' }} />
            <Link to={`/post/${post.slug}`}>
              <button className='w-max py-2.5 text-gray-400 hover:text-black'>Read more...</button>
            </Link>
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
            {currentPage < Math.ceil(posts.length / postsPerPage) && (
              <div className='flex align-center right' onClick={() => setCurrentPage(currentPage + 1)}>
                <span>下一頁</span>
                <span className='material-symbols-sharp'>
                  chevron_right
                </span>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Home
