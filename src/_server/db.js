// @flow

import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI)

/* eslint-disable no-console */
mongoose.connection.on('connected', () => console.log('DB connected.'))
mongoose.connection.on('error', err => console.error(err))
mongoose.connection.on('disconnected', () => console.log('DB disconnected.'))
/* eslint-enable no-console */

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit()
  })
})
