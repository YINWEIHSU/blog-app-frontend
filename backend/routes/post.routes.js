const express = require('express')
const router = express.Router()
const db = require('../models')
const postController = require('../controllers/post.controllers')
const passport = require('../common/passport')
const authenticated = passport.authenticate('jwt', { session: false })

router.get('/', postController.getPosts)
router.get('/:id', postController.getPost)
router.post('/', authenticated, postController.createPost)
router.put('/:id', authenticated, postController.updatePost)
router.delete('/:id', authenticated, postController.deletePost)

module.exports = router
