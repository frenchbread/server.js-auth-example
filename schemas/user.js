const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// Hash the user's password before inserting a new user
UserSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)

      bcrypt.hash(this.password, salt, (err1, hash) => {
        if (err1) return next(err1)

        this.password = hash

        return next()
      })
    })
  } else {
    return next()
  }
})

// Compare password input to password saved in database
UserSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) return cb(err)

    return cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
