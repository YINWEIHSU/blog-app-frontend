const db = require('../models')
const Post = db.Post
const User = db.User

const postController = {
  getPosts: async (req, res) => {
    const query = req.query.cat
      ? `SELECT posts.id, posts.title, posts.content, posts.created_at, posts.updated_at FROM posts JOIN categories ON posts.category_id = categories.id WHERE name='${req.query.cat}'`
      : 'SELECT * FROM Posts'
    const [results] = await db.sequelize.query(query)
    return res.status(200).json(results)
  },
  getPost: async (req, res) => {
    const query = `SELECT * FROM posts WHERE posts.id=${req.params.id}`
    const [results] = await db.sequelize.query(query)
    return res.status(200).json(results)
  },
  createPost: async (req, res) => {
    const { title, content } = req.body
    const post = await Post.create({
      title,
      content,
      UserId: req.user.id
    })
    return res.status(201).json(post)
  },
  updatePost: async (req, res) => {
    const { title, content } = req.body
    const post = await Post.findByPk(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    await post.update({
      title,
      content
    })
    return res.status(200).json(post)
  },
  deletePost: async (req, res) => {
    const post = await Post.findByPk(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    await post.destroy()
    return res.status(204).json()
  }
}

module.exports = postController
