const server = require('server')
const passport = require('passport')

const userModel = require('../models/user')

const { modern } = server.utils
const { get, post } = server.router
const { json } = server.reply

module.exports = [
  post('/register', ctx => {
    const { email, password } = ctx.data

    return userModel.register(email, password)
      .then(res => json({ ok: true, message: res }))
      .catch(err => json({ ok: false, message: err.message }))
  }),
  post('/login', ctx => {
    const { email, password } = ctx.data

    return userModel.authenticate(email, password)
      .then(message => json({ ok: true, message }))
      .catch(err => json({ ok: false, err: err.message }))
  }),
  get('/verify', modern(passport.authenticate('jwt', { session: false })), ctx => {
    const user = ctx.user

    return json({ ok: true, user })
  })
]
