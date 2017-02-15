// @flow

/* eslint-disable no-console */

import express from 'express'

import staticApp from './static-app'
import { WEB_PORT, STATIC_PATH } from '../shared/config'
import { asyncHelloRoute } from '../shared/routes'
import store from './store'
import staticTemplate from './static-template'

const app = express()

app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

app.get(asyncHelloRoute(), (req, res) => {
  res.json({ message: `Hello from the server! (received ${req.params.num})` })
})

app.get('*', (req, res) => {
  res.send(staticTemplate(staticApp(req.url, store), store.getState()))
})

app.listen(WEB_PORT, () => {
  console.log(`Express running on port ${WEB_PORT}.`)
})
