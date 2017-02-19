// @flow

import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  asyncHelloRoute,
} from '../shared/routes'
import renderApp from './render-app'

export default (server: Object) => {
  server.get(HOME_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url))
  })

  server.get(HELLO_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, {
      hello: { message: 'Server-side preloaded message' },
    }))
  })

  server.get(HELLO_ASYNC_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, {
      hello: { messageAsync: 'Server-side preloaded message for async page' },
    }))
  })

  server.get(asyncHelloRoute(), (req, res) => {
    res.json({ message: `Hello from the server! (received ${req.params.num})` })
  })
}
