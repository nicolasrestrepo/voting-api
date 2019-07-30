const Candidate = require('../models/candidate')



async function add(req, res) {
  const data = req.body
  console.log('data', data)
  try {
    const candidate = await new Candidate(data).save()
    console.log('candidate', candidate)
    return res.status(200).send({ candidate })
  } catch (error) {
    console.error('error', error)
    return res.status(500).send({ error, message: 'internal server error' })
  }
}


async function getAll(req, res) {
  const query = req.query
  try {
    const candidates = await Candidate.find(query)
    return res.status(200).send(candidates)
  } catch (error) {
    console.error('error', error)
    return res.status(500).send({ message: 'internal server error' })
  }
}


async function getById(req, res) {
  const { id } = req.params

  try {
    const candidate = await Candidate.findOne({ _id: id }, { password: 0 })
    if (!candidate) {
      return res.status(404).send({ message: 'candidate not found' })
    }
    return res.status(200).send({ data: candidate })
  } catch (error) {
    console.error('error', error)
    return res.status(500).send({ message: 'internal server error' })
  }
}



async function update(req, res) {

  const data = req.body
  const { id } = req.params
  console.log('data', data, 'id', id)
  try {
    const candidate = await Candidate.findOneAndUpdate({ _id: id }, data, { new: true })
    if (!candidate) {
      return res.status(404).send({ message: 'user not found' })
    }
    return res.status(200).send({ candidate })
  } catch (error) {
    console.error('error', error)
    return res.status(500).send({ error, message: 'internal server error' })
  }
}

module.exports = {
  add,
  getById,
  getAll,
  update
}