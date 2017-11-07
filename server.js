const server = require('server')
const mongoose = require('mongoose')
const passport = require('passport')

const config = require('./config')

const { modern } = server.utils

// Initialize MongoDB <-> Server connection
mongoose.connect(config.db)

// Initialize PassportJS with JWT strategy
require('./lib/jwt')(passport)

server(
    // Server config
    { port: 3030, security: { csrf: false } },

    // Express-like passport middleware
    modern(passport.initialize()),

    // Routes
    require('./routes')
  )
  .then(ctx => console.log(`server running at port ${ctx.options.port}`))
