const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../env')
/**
 * register
 * @param {String} email
 * @param {String} name
 * @param {string} password
 * @param {String} identification
 * @param {string} phoneNumber
 */

async function register(req, res) {
  const data = req.body
  try {
    const foundUser = await User.findOne({ email: data.email })

    if (foundUser) {
      return res.status(403).send({ message: 'Email is already in use' })
    }

    const user = await new User(data).save()
    delete user.password
    return res.status(200).send({ user })
  } catch (error) {
    console.error('error', error)
    return res.status(500).send({ error, message: 'internal server error' })
  }
}

/**
 * login
 * @param {String} email
 * @param {String} password
 * @returns {Object} {user, token}
 */
async function login(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).send({ message: 'user or email invalid' })
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).send({ message: 'internal server error' })
      }
      if (!isMatch) {
        return res.status(404).send({ message: 'user or email invalid' })
      }
      const token = jwt.sign({ email }, jwtSecret)
      delete user.password
      return res.status(200).send({
        token,
        user
      })
    })
  } catch (error) {
    console.error('error', error)
    return res.status(500).send({ error, message: 'internal server error' })
  }
}

module.exports = {
  login,
  register
}