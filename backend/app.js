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
app.use('/downloads', express.static(path.resolve( __dirname, 'processing', 'downloads')))

app.use('/api', apiRouter);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname))

  const client = [
    '.js',
    '.css',
    '.ico'
  ];
 
  app.get('*', (req, res) => {
    if (!(req.path).includes('uploads/')) {
      if (client.includes(path.extname(req.path))) {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'frontend', req.path));
      } else {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'frontend', 'index.html'))
      }
    }
  })
}

module.exports = app