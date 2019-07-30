const { createServer } = require('http')
const mongoose = require('mongoose')
const { json, urlencoded } = require('body-parser')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { errors } = require('celebrate')

const env = require('./src/env')
const api = require('./src/api')

const app = express()

app.use(cors())
app.use(helmet())
app.use(json({ limit: '140mb' }))
app.use(urlencoded({ extended: true, limit: '140mb' }))
app.use(errors())
app.use('/api', api)

const server = createServer(app)

mongoose.connect(
  `${env.mongoUrl}/${env.mongoDb}`,
  (err, res) => {
    if (err) {
      return console.log('error in conection mongo', err)
    }
    server.listen(env.port, () => {
      console.log(`server running on port ${env.port}`)
    })
  }
)

module.exports = server