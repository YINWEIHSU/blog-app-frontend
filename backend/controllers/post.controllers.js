const db = require('../models')
const Post = db.Post
const Category = db.Category

const postController = {
  getPosts: async (req, res) => {
    const query = req.query.cat
      ? `SELECT posts.id, posts.title, posts.content, posts.img, posts.created_at, posts.updated_at FROM posts JOIN categories ON posts.category_id = categories.id WHERE name='${req.query.cat}'`
      : 'SELECT * FROM Posts'
    const [results] = await db.sequelize.query(query)
    return res.status(200).json(results)
  },
  getPost: async (req, res) => {
    const query = `SELECT p.id AS id, p.img, email, title, content, c.name AS category, p.created_at, p.updated_at FROM posts p JOIN users u ON p.user_id = u.id JOIN categories c ON c.id = p.category_id WHERE p.id=${req.params.id}`
    const [results] = await db.sequelize.query(query)
    return res.status(200).json(results)
  },
  createPost: async (req, res) => {
    const { title, content, category, status } = req.body
    const userId = req.user.dataValues.id
    const categoryData = await Category.findOne({ where: { name: category } })
    const post = await Post.create({
      title,
      content,
      status,
      UserId: userId,
      CategoryId: categoryData.dataValues.id
    })
    return res.status(201).json(post)
  },
  updatePost: async (req, res) => {
    const { id, title, content, category, status } = req.body
    const categoryData = await Category.findOne({ where: { name: category } })
    const post = await Post.findByPk(id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    await post.update({
      title,
      content,
      status,
      CategoryId: categoryData.dataValues.id
    })
    return res.status(200).json(post)
  },
  deletePost: async (req, res) => {
    const user = req.user.dataValues
    const postData = await Post.findByPk(req.params.id)
    const post = postData.dataValues
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    if (post.UserId !== user.id) {
      return res.status(403).json({ message: 'You are not authorized to do this' })
    }

    await postData.destroy()
    return res.status(204).json({ message: 'Post deleted' })
  }
}

module.exports = postController
