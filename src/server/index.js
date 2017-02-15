// @flow

/* eslint-disable no-console */

import express from 'express'

import staticApp from './static-app'
import { WEB_PORT, STATIC_PATH } from '../shared/config'
import { defaultStore, initStore } from './store'
import staticTemplate from './static-template'
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  asyncHelloRoute,
} from '../shared/routes'

const app = express()

app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

const buildPage = (location, store) => staticTemplate(staticApp(location, store), store.getState())

app.get(HOME_PAGE_ROUTE, (req, res) => {
  const store = initStore(defaultStore) // Use DB data for this page instead
  res.send(buildPage(req.url, store))
})

app.get(HELLO_PAGE_ROUTE, (req, res) => {
  const store = initStore(defaultStore) // Use DB data for this page instead
  res.send(buildPage(req.url, store))
})

app.get(HELLO_ASYNC_PAGE_ROUTE, (req, res) => {
  const store = initStore(defaultStore) // Use DB data for this page instead
  res.send(buildPage(req.url, store))
})

app.get(asyncHelloRoute(), (req, res) => {
  res.json({ message: `Hello from the server! (received ${req.params.num})` })
})

app.listen(WEB_PORT, () => {
  console.log(`Express running on port ${WEB_PORT}.`)
})
