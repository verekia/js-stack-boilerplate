// @flow

import 'babel-polyfill'

import React from 'react'
import http from 'http'
import ReactDOMServer from 'react-dom/server'
import Koa from 'koa'
import compress from 'koa-compress'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import Router from 'koa-router'
import serveStatic from 'koa-static'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'

import App from 'app/app'

const PORT = 8000
const IS_PROD = false

const main = async () => {
  const app = new Koa()
  const router = new Router()

  router.get('*', ctx => {
    const appHtml = ReactDOMServer.renderToString(<App />)
    const helmet = Helmet.renderStatic()
    const data = { name: 'Sven' }

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
        <script src="/static/js/bundle.js"></script>
        <script>window.__PRELOADED_STATE__ = ${serialize(data)}</script>
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
    /* centralized error handling:
     *   console.log error
     *   write error to log file
     *   save error and request information to database if ctx.request match condition
     *   ...
    */
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
