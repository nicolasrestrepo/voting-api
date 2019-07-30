'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    marriageStatus: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

if (!userSchema.options.toJSON) {
  userSchema.options.toJSON = {}
}

/**
 * METHODS
 * */
userSchema.method({
  // Compare password method
  comparePassword(candidatePass, cb) {
    bcrypt.compare(candidatePass, this.password, (err, isMatch) => {
      if (err) {
        return cb(err)
      }
      cb(null, isMatch)
      return isMatch
    })
  }
})

// Encrypt password
userSchema.pre('save', function (next, done) {
  const user = this

  // Only has the password if it has been modified or is new
  if (!user.isModified('password')) {
    return next()
  }

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    // Hash the password along with our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      // Override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

/**
 * Add a tranforma method to change _id by id
 * whent toJSON is used.
 */
userSchema.options.toJSON.transform = (doc, ret) => {
  // Remove the _id of every document before returning the result
  ret.id = ret._id // eslint-disable-line no-param-reassign
  delete ret._id // eslint-disable-line no-param-reassign
  return ret
}

module.exports = mongoose.model('User', userSchema)