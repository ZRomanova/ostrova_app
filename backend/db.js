const Pool = require('pg').Pool
const keys = require('./config/keys')

const pool = new Pool({
  user: keys.pgUser,
  password: keys.pgPassword,
  host: 'localhost',
  port: keys.pgPort,
  database: keys.pgDatabase
})

module.exports = pool