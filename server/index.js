const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { db, connect } = require('./db')
const PORT = process.env.PORT || 5000
const app = express()
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const User = require('./db/schemas/user')

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // compression middleware
  // app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: new MongoStore({ mongooseConnection: db }),
      resave: false,
      saveUninitialized: false
    })
  )

  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec()
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  app.use(passport.initialize())
  app.use(passport.session())

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // sends index.html
  // app.use('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  // })

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )
}

async function bootApp() {
  await connect()
  createApp()
  startListening()
}

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec

if (require.main === module) {
  console.log('BOOTING APP')
  bootApp()
} else {
  console.log('CREATING APP')
  createApp()
}

module.exports = app
