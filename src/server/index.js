// @flow

/* eslint-disable no-console */

import express from 'express'

import { EXPRESS_PORT } from '../shared/config'
import masterTemplate from './templates/master-template'

const app = express()

app.use('/dist', express.static('dist'))
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.send(masterTemplate('Dog App'))
})

app.listen(EXPRESS_PORT, () => {
  console.log(`Express running on port ${EXPRESS_PORT}.`)
})
