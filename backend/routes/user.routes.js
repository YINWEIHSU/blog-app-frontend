const express = require('express')
const router = express.Router()

router.post('/create', (req, res) => {
  res.send('Create')
})
router.post('/delete', (req, res) => {
  res.send('Delete')
})
router.post('/update', (req, res) => {
  res.send('Update')
})

module.exports = router