const jwt = require('jsonwebtoken')

const User = require('../schemas/user')
const config = require('../config')

module.exports = {
  register (email, password) {
    return new Promise((resolve, reject) => {
      if (email && password) {
        const newUser = new User({ email, password })
        // Attempt to save the user
        newUser.save((err, user) => {
          if (err) reject(new Error('That email address already exists.'))

          resolve('Successfully created new user.')
        })
      } else {
        reject(new Error('Please enter email and password.'))
      }
    })
  },
  authenticate (email, password) {
    return new Promise((resolve, reject) => {
      User.findOne({ email }, (err, user) => {
        if (err) reject(new Error('Authentication failed.'))

        if (user) {
          // Check if password matches
          user.comparePassword(password, (err1, isMatch) => {
            if (isMatch && !err1) {
              // Create token if the password matched and no error was thrown
              const token = jwt.sign(user, config.secret, { expiresIn: '2 days' })
              resolve({ user: { _id: user._id, email: user.email }, token })
            } else {
              reject(new Error('Authentication failed. Passwords did not match.'))
            }
          })
        } else {
          reject(new Error('Authentication failed. User not found.'))
        }
      })
    })
  }
}
