const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const passport = require('passport')
const db = require('../models')
const User = db.User

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

const strategy = new JwtStrategy(jwtOptions, async function (jwtPayload, next) {
  const user = await User.findByPk(jwtPayload.id)
  if (!user) { return next(null, false) }
  return next(null, user)
})
passport.use(strategy)
module.exports = passport
