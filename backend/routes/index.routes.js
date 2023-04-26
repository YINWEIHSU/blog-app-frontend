const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')
const postRouter = require('./post.routes')

module.exports = function (app) {
  app.use('/api/auth', authRouter)
  app.use('/api/users', userRouter)
  app.use('/api/posts', postRouter)
}
