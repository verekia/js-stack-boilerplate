// @flow

/* eslint-disable no-console */

import express from 'express'

import staticApp from './static-app'
import { EXPRESS_PORT, STATIC_PATH } from '../shared/config'
import routes from '../shared/routes'
import initStore from './store'
import staticTemplate from './static-template'

const app = express()

app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

app.get(routes.asyncBark, (req, res) => {
  res.send({ message: 'Wah wah! (from the server)' })
})

app.get('*', (req, res) => {
  const store = initStore({ barkMessage: 'The dog is quiet (server-side)' })
  res.send(staticTemplate(staticApp(req.url, store), store.getState()))
})

app.listen(EXPRESS_PORT, () => {
  console.log(`Express running on port ${EXPRESS_PORT}.`)
})
