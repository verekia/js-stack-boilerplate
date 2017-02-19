// @flow

import {
  homePage,
  helloPage,
  helloAsyncPage,
  helloEndpoint,
} from './controller'
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  helloEndpointRoute,
} from '../shared/routes'
import renderApp from './render-app'

export default (server: Object) => {
  server.get(HOME_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, homePage()))
  })

  server.get(HELLO_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, helloPage()))
  })

  server.get(HELLO_ASYNC_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, helloAsyncPage()))
  })

  server.get(helloEndpointRoute(), (req, res) => {
    res.json(helloEndpoint(req.params.num))
  })
}
