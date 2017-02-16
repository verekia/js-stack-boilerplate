// @flow

/* eslint-disable no-console */

import express from 'express'
import { SheetsRegistry } from 'react-jss'

import renderApp from './static-app'
import { WEB_PORT, STATIC_PATH } from '../shared/config'
import initStore from './init-store'
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

const renderPage = (location, store) => {
  const sheets = new SheetsRegistry()
  const staticApp = renderApp(location, store, sheets)
  return staticTemplate(staticApp, store.getState(), sheets)
}

app.get(HOME_PAGE_ROUTE, (req, res) => {
  res.send(renderPage(req.url, initStore()))
})

app.get(HELLO_PAGE_ROUTE, (req, res) => {
  res.send(renderPage(req.url, initStore({
    hello: { message: 'Server-side preloaded message' },
  })))
})

app.get(HELLO_ASYNC_PAGE_ROUTE, (req, res) => {
  res.send(renderPage(req.url, initStore({
    hello: { messageAsync: 'Server-side preloaded message for async page' },
  })))
})

app.get(asyncHelloRoute(), (req, res) => {
  res.json({ message: `Hello from the server! (received ${req.params.num})` })
})

app.listen(WEB_PORT, () => {
  console.log(`Express running on port ${WEB_PORT}.`)
})
