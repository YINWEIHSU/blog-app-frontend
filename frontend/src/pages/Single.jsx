import { useState, useEffect, useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Menu from "../components/Menu"
import axios from 'axios'
import moment from 'moment'
import AuthContext from "../context/AuthContext"

const Single = () => {
  const [post, setPost] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const postId = location.pathname.split('/')[2]
  const {currentUser} = useContext(AuthContext)

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)  
        setPost(res.data[0])
      } catch (err) {
        console.log(err)
      }
    }
    fetchPost()
  }, [postId])

  return (
    <div className="flex gap-12">
      <div className="grow-5 flex flex-col gap-7 max-w-2xl">
        <img className="h-80 w-full object-cover" src="https://dummyimage.com/1920x1080/9bd1c8/dcdce0" alt="" />
        <div className="flex items-center gap-2.5 text-sm">
          <img className="w-12 h-12 rounded-full object-cover" src="https://dummyimage.com/1920x1080/9bd1c8/dcdce0" alt="" />
          <div>
            <span className="font-bold">User</span>
            <p>Posted {moment(post.updated_at).fromNow()}</p>
          </div>
          {currentUser && currentUser.email === post.email && (<div className="flex gap-1.5">
            <Link to="/write?edit=123">
              <div>Edit</div>
            </Link>
            <div onClick={handleDelete}>Delete</div>
          </div>)}
        </div>
        <h1 className="text-4xl">{post.title}</h1>
        <p className="text-justify leading-7">{post.content}</p>
      </div>
      <Menu></Menu>
    </div>
    )
}

export default Single