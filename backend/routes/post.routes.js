const express = require('express')
const router = express.Router()
const db = require('../models')
const Post = db.Post
const postController = require('../controllers/post.controllers')

router.get('/', postController.getPosts)
router.get('/:id', postController.getPost)
router.post('/', postController.createPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

module.exports = router