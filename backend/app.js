const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const passport = require('passport')

const apiRouter = require('./routes');

const app = express()

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

require('./middleware/passport')
app.use(passport.initialize());

app.use('/uploads', express.static('uploads'))
app.use('/api', apiRouter);
// app.get('/', (req, res) => {
//   res.sendFile(
//     path.resolve(
//       __dirname, '..', 'index.html'
//     )
//   )
// })

module.exports = app