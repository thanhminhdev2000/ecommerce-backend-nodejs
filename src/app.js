require('dotenv').config()
const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init db
require('./dbs/init.mongodb')

// init routes
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome my app',
  })
})

// handling error

module.exports = app
