import { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import AuthContext from '../context/AuthContext'
import MDEditor from '@uiw/react-md-editor'

const Single = () => {
  const [post, setPost] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const postId = location.pathname.split('/')[2]
  const { currentUser } = useContext(AuthContext)

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        if (res.data.length === 0) {
          navigate('/404')
        }
        setPost(res.data[0])
      } catch (err) {
        console.log(err)
      }
    }
    fetchPost()
  }, [postId, navigate])

  return (
    <div className='flex gap-12'>
      <div data-color-mode='light' className='grow-5 flex flex-col gap-7 max-w-2xl'>
        <img className='h-80 w-full object-cover' src={post.img} alt='' />
        <div className='flex items-center gap-2.5 text-sm'>
          <img className='w-12 h-12 rounded-full object-cover' src='https://dummyimage.com/1920x1080/9bd1c8/dcdce0' alt='' />
          <div>
            <span className='font-bold'>User</span>
            <p>Posted {moment(post.updated_at).fromNow()}</p>
          </div>
          {currentUser && currentUser.email === post.email && (
            <div className='flex gap-1.5'>
              <Link to='/write?edit=123' state={post}>
                <div>Edit</div>
              </Link>
              <div onClick={handleDelete}>Delete</div>
            </div>
          )}
        </div>
        <MDEditor.Markdown source={post.content} style={{ whiteSpace: 'pre-wrap' }} />
      </div>
      <Menu category={post.category} currentPostId={post.id} />
    </div>
  )
}

export default Single
