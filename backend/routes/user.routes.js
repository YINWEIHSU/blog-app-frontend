const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers')

router.get('/:id', userController.getUser)
router.put('/update/:id', userController.updateUser)

module.exports = router
