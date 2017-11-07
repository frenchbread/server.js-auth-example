const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../schemas/user')
const config = require('../config')

// JWT passport strategy
module.exports = function (passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
  }

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({ _id: jwtPayload._doc._id }, { password: 0 }, (err, user) => {
      if (err) return done(err, false)

      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
