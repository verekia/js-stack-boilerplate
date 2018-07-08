// @flow

import 'babel-polyfill'

import http from 'http'

import Koa from 'koa'
import body from 'koa-body'
import compress from 'koa-compress'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import Router from 'koa-router'
import session from 'koa-session'
import enforceHttps from 'koa-sslify'
import serveStatic from 'koa-static'

import redis from '_db/redis'
import { DISABLE_SSL, PORT, SESSION_SECRET_KEY, isProd } from '_server/env'
import setUpRouting from '_server/routing'

const main = async () => {
  const app = new Koa()
  app.keys = [SESSION_SECRET_KEY]

  const router = new Router()
  setUpRouting(router)

  DISABLE_SSL || app.use(enforceHttps({ trustProtoHeader: true }))

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.app.emit('error', err, ctx)
      ctx.redirect('/error')
    }
  })

  app.use(
    session(
      {
        maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
        rolling: true,
        // httpOnly: false,
        store: {
          get: async key => JSON.parse(await redis.getAsync(`session:${key}`)),
          set: (key, sess) => redis.setAsync(`session:${key}`, JSON.stringify(sess)),
          destroy: key => redis.delAsync(key),
        },
      },
      app,
    ),
  )

  app
    .use(body())
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
