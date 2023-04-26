const express = require('express')
const router = express.Router()

router.post('/create', (req, res) => {
  res.send('create')
})
router.post('/update', (req, res) => {
  res.send('Register')
})

module.exports = router