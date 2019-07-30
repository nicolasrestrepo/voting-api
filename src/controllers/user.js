const User = require('../models/user')

/**
 * register
 * @param {String} email
 * @param {String} name
 * @param {String} identification
 * @param {string} phoneNumber
 */

async function getAll(req, res) {
  const query = req.query
  try {
    const users = await User.find(query)
    return res.status(200).send({ users })
  } catch (error) {
    console.error('error', error)
    return res.status(500).send({ message: 'internal server error' })
  }
}

/**
 * register
 * @param {String} email
 * @param {String} name
 * @param {String} identification
 * @param {string} phoneNumber
 */

async function getById(req, res) {
  const { id } = req.params

  try {
    const user = await User.findOne({ _id: id }, { password: 0 })
    if (!user) {
      return res.status(404).send({ message: 'user not found' })
    }
    return res.status(200).send({ user })
  } catch (error) {
    console.error('error', error)
    return res.status(500).send({ message: 'internal server error' })
  }
}

/**
 * register
 * @param {String} email
 * @param {String} name
 * @param {String} identification
 * @param {string} phoneNumber
 */

async function update(req, res) {
  const data = req.body
  const { id } = req.params

  try {
    const user = await User.findOneAndUpdate({ _id: id }, data, { new: true })
    if (!user) {
      return res.status(404).send({ message: 'user not found' })
    }
    return res.status(200).send({ user })
  } catch (error) {
    console.error('error', error)
    return res.status(500).send({ error, message: 'internal server error' })
  }
}

module.exports = {
  getById,
  getAll,
  update
}