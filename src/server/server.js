// @flow

/* eslint-disable no-console */

import express from 'express'

import { EXPRESS_PORT } from '../shared/config'
import routes from '../shared/routes'
import masterTemplate from './templates/master-template'

const app = express()

app.use('/dist', express.static('dist'))
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.send(masterTemplate('Dog App'))
})

app.get(routes.asyncBark, (req, res) => {
  res.send({ message: 'Wah wah! (from the server)' })
})

app.listen(EXPRESS_PORT, () => {
  console.log(`Express running on port ${EXPRESS_PORT}.`)
})
