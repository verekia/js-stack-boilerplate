// @flow

import 'babel-polyfill'

import React from 'react'
import http from 'http'
import ReactDOMServer from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Koa from 'koa'
import compress from 'koa-compress'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import Router from 'koa-router'
import serveStatic from 'koa-static'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'
import routes from '_shared/routes'

import App from 'app/app'

const PORT = 8000
const IS_PROD = false

const dogs = [{ id: '123', name: 'Medor' }, { id: '456', name: 'Max' }]

const main = async () => {
  const app = new Koa()
  const router = new Router()

  router.get('/api/dogs', ctx => {
    ctx.body = { dogs }
  })

  router.get('/api/dog/:id', ctx => {
    ctx.body = { dog: dogs.find(d => d.id === ctx.params.id) }
  })

  router.get('*', async (ctx, next) => {
    const activeRoute: Object = routes.find(route => matchPath(ctx.req.url, route)) || {}
    if (ctx.req.url.startsWith('/static')) {
      next()
      return
    }
    const pageData = activeRoute.apiCall ? await activeRoute.apiCall(ctx.req.url) : {}
    const generalData = {}
    const store = createStore(() => ({ page: pageData, general: generalData }))
    const appHtml = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.req.url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>,
    )
    const helmet = Helmet.renderStatic()

    ctx.body = `<!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="app-root">${appHtml}</div>
        <script>window.__PRELOADED_STATE__ = ${serialize(store.getState())}</script>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>`
  })

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = err.message
      ctx.app.emit('error', err, ctx)
    }
  })

  app.on('error', (err, ctx) => {
    console.error(err)
  })

  app
    .use(compress())
    .use(mount('/static', serveStatic('dist')))
    .use(mount('/static', serveStatic('public')))
    .use(favicon(`./public/img/favicon.ico`))
    .use(router.routes())
    .use(router.allowedMethods())

  const server = http.createServer(app.callback())
  console.log(`Server now listenning on port ${PORT} (${IS_PROD ? 'production' : 'development'})`)
  server.listen(PORT)
}

main()
