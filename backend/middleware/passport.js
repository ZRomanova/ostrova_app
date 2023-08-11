const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../db');
const keys = require('../config/keys')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}

const verifyCallback = async (payload, done) => {
  try {

    // console.log(payload)
    const user = await db.query('SELECT * FROM users WHERE id = $1', [payload.user_id])

    if (user.rowCount) {

      done(null, user.rows[0])
    } else {
      done(null, false)
    }
  } catch (e) {
    done(e)
  }
}

const strategy = new JwtStrategy(options, verifyCallback)

passport.use(strategy)