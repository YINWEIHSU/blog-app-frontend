const { User } = require('../models')

const userController = {
  getUser: async (req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json(user)
  },
  updateUser: async (req, res) => {
    const { id } = req.params
    const currentUserId = req.user.dataValues.id
    if (Number(id) !== currentUserId) {
      return res.status(403).json({ message: 'You are not authorized to do this' })
    }
    const { name, password, checkPassword } = req.body
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (password !== checkPassword) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }
    await user.update({
      name,
      password
    })
    return res.status(200).json(user)
  }
}

module.exports = userController
