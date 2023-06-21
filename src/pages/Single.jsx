import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Menu from '../components/Menu'
import moment from 'moment'
import AuthContext from '../context/AuthContext'
import PostContext from '../context/PostContext'
import MDEditor from '@uiw/react-md-editor'
import './single.scss'

const Single = () => {
  const [post, setPost] = useState({})
  const navigate = useNavigate()
  const { slug } = useParams()
  const { currentUser } = useContext(AuthContext)
  const { posts, getPost, deletePost } = useContext(PostContext)
  const index = posts.findIndex(item => item.slug === slug)

  const handleDelete = async () => {
    try {
      await deletePost(slug)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(slug)
        if (data.length === 0) {
          navigate('/404')
          return
        }
        setPost(data)
      } catch (err) {
        if (err.response.status === 404) {
          navigate('/404')
        }
      }
    }
    fetchPost()
  }, [slug, navigate])

  return (
    <div className='single-page flex justify-between gap-12'>
      <div data-color-mode='light' className='w-full grow-5 flex flex-col'>
        {currentUser && currentUser.email === post.email && (
          <div className='flex gap-1.5 pb-5'>
            <Link className='rounded-full bg-sky-950 text-white flex justify-center items-center p-1 hover:text-sky-950 hover:bg-inherit' to={`/write?edit=${slug}`} state={post}>
              <span className='material-symbols-sharp bg-inherit'>
                edit
              </span>
            </Link>
            <div className='cursor-pointer rounded-full bg-rose-600 text-white flex justify-center items-center p-1 hover:text-rose-600 hover:bg-inherit' onClick={handleDelete}>
              <span className='material-symbols-sharp bg-inherit'>
                delete
              </span>
            </div>
          </div>
        )}
        <div className='flex'>
          <Link to={`/categories/${post.category}`} className='inline-block text-orange-800 hover:text-orange-500'>
            {post.category}
          </Link>
        </div>
        <div className='py-2'>{moment(post.createdAt).format('YYYY/MM/DD')}</div>
        <MDEditor.Markdown className='max-w-md' source={post.content} style={{ whiteSpace: 'pre-wrap' }} />
        <div className='flex items-center gap-2.5 text-sm my-8'>
          <img className='w-14 h-14 rounded-full object-cover' src='https://dummyimage.com/1920x1080/9bd1c8/dcdce0' alt='' />
          <div>
            <span className='font-bold'>User</span>
            <p>Posted {moment(post.createdAt).fromNow()}</p>
          </div>
        </div>
        <div className='mb-8 flex gap-3'>
          {post.tags && post.tags.map(tag => (
            <Link key={tag.id} to={`/tags/${tag.name}`}>
              <span className='tag bg-gray-200 px-2 py-1 rounded-full text-sm mr-2'>{tag.name}</span>
            </Link>
          ))}
        </div>
        <Menu currentPost={post} />
        <nav className='flex justify-between py-5 text-lg my-8'>
          <div>
            {index > 0 && (
              <Link to={`/post/${posts[index - 1].slug}`}>
                <div className='flex align-center left' onClick={() => {}}>
                  <span className='material-symbols-sharp'>
                    chevron_left
                  </span><span>{posts[index - 1].title}</span>
                </div>
              </Link>
            )}
          </div>
          <div>
            {index + 1 < posts.length && (
              <Link to={`/post/${posts[index + 1].slug}`}>
                <div className='flex align-center right' onClick={() => {}}>
                  <span>{posts[index + 1].title}</span>
                  <span className='material-symbols-sharp'>
                    chevron_right
                  </span>
                </div>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Single
