// @flow

import 'babel-polyfill'

import http from 'http'

import Koa from 'koa'
import compress from 'koa-compress'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import Router from 'koa-router'
import serveStatic from 'koa-static'

import { PORT, isProd } from '_server/env'
import setUpRouting from '_server/routing'

const main = async () => {
  const app = new Koa()

  const router = new Router()
  setUpRouting(router)

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.app.emit('error', err, ctx)
      ctx.redirect('/error')
    }
  })

  app
    .use(compress())
    .use(mount('/static', serveStatic('dist')))
    .use(mount('/static', serveStatic('public')))
    .use(favicon(`./public/img/favicon.ico`))
    .use(router.routes())
    .use(router.allowedMethods())

  const server = http.createServer(app.callback())
  // eslint-disable-next-line no-console
  console.log(`Server now listenning on port ${PORT} (${isProd ? 'production' : 'development'})`)
  server.listen(PORT)
}

main()
