const { Router } = require('express')
const { celebrate, Joi } = require('celebrate')
const passport = require('passport')
require('./passport')
const user = require('./controllers/user')
const auth = require('./controllers/auth')
const candidate = require('./controllers/candidate')

const api = Router()

// ********************** auth endpoints *******************

api.post(
  '/register',
  celebrate({
    body: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
  }),
  auth.register
)

api.post(
  '/login',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
  auth.login
)


// ********************** user endpoints *******************

api.get('/users',
  passport.authenticate('jwt', { session: false }),
  user.getAll)

api.get(
  '/users/:id',
  passport.authenticate('jwt', { session: false }),
  celebrate({
    params: {
      id: Joi.string().required()
    }
  }),
  user.getById
)

api.patch(
  '/users/:id',
  passport.authenticate('jwt', { session: false }),
  celebrate({
    params: {
      id: Joi.string().required()
    },
    body: Joi.object().keys({
      email: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
    })
  }),
  user.update
)

// ********************** candidate endpoints *******************
api.post('/candidates',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      timePublished: Joi.string().required(),
      category: Joi.string().required(),
      photo: Joi.string().required(),
      percentageUp: Joi.number().required(),
    })
  }), candidate.add)

api.get('/candidates', candidate.getAll)

api.get(
  '/candidates/:id',
  celebrate({
    params: {
      id: Joi.string().required()
    }
  }),
  candidate.getById
)

api.patch(
  '/candidates/:id',
  celebrate({
    params: {
      id: Joi.string().required()
    },
    body: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string(),
      timePublished: Joi.string(),
      category: Joi.string(),
      photo: Joi.string(),
      percentageUp: Joi.number(),
    })
  }),
  candidate.update
)


module.exports = api