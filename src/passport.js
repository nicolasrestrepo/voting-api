
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const { jwtSecret } = require('./env')

const User = require('./models/user')

// jwt strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({ email: payload.email })

        if (!user) {
          return done(null, false)
        }

        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  )
)