// @flow

import http from 'http'

import Koa from 'koa'
import compress from 'koa-compress'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import Router from 'koa-router'
import serveStatic from 'koa-static'

const PORT = 8000

const main = async () => {
  const app = new Koa()

  const router = new Router()

  router.get('*', ctx => {
    ctx.body = `<html><body><div id="app-root"></div><script src="/static/js/bundle.js"></script></body></html>`
  })

  app
    .use(compress())
    .use(favicon(`./${PUBLIC}/${IMG}/favicon.ico`))
    .use(mount(`/${STATIC}`, serveStatic(DIST)))
    .use(mount(`/${STATIC}`, serveStatic(PUBLIC)))
    .use(router.routes())
    .use(router.allowedMethods())

  const server = http.createServer(app.callback())
  console.log(`Server now listenning on port ${PORT} (${IS_PROD ? 'production' : 'development'})`)
  server.listen(PORT)
}

main()
