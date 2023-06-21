import { createContext, useEffect, useState } from 'react'
import api from '../api'

const PostContext = createContext()
const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  const getPosts = async () => {
    const res = await api.get('/posts')
    setPosts(res.data)
  }

  const getPost = async (slug) => {
    const res = await api.get(`/posts/${slug}`)
    return res.data
  }

  const createPost = async (input) => {
    const response = await api.post('/posts', input)
    getPosts()
    getCategories()
    getTags()
    return response
  }

  const updatePost = async (slug, input) => {
    const response = await api.put(`/posts/${slug}`, input)
    getPosts()
    getCategories()
    getTags()
    return response
  }

  const deletePost = async (slug) => {
    await api.delete(`/posts/${slug}`)
    getPosts()
    getCategories()
    getTags()
  }

  const getCategories = async () => {
    const res = await api.get('/categories')
    setCategories(res.data)
  }

  const createCategory = async (input) => {
    const response = await api.post('/categories', { name: input })
    getCategories()
    return response
  }

  const getTags = async () => {
    const res = await api.get('/tags')
    setTags(res.data)
  }

  useEffect(() => {
    getPosts()
    getCategories()
    getTags()
  }, [])

  return (
    <PostContext.Provider value={{ categories, tags, posts, createCategory, getPost, getPosts, createPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  )
}

export { PostContextProvider }
export default PostContext
