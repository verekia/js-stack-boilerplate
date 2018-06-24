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
  app.keys = [SESSION_SECRET_KEY]

  const redis = Redis().createClient(REDIS_URL)
  const passwordResetKeys = await redis.keys(`${REDIS_PREFIX_PASSWORD_RESET}:*`)
  passwordResetKeys.forEach(k => redis.del(k))
  redis.on('error', error => logger.error('Redis error', { error }))
  process.on('SIGINT', async () => {
    await redis.quit()
    process.exit()
  })
  setRedisClient(redis)

  await initServerStore()

  const router = setUpRouting(new Router())

  NO_HTTPS || app.use(enforceHttps({ trustProtoHeader: true }))

  app
    .use(compress())
    .use(favicon(`./${PUBLIC}/${IMG}/favicon.ico`))
    .use(mount(`/${STATIC}`, serveStatic(DIST)))
    .use(mount(`/${STATIC}`, serveStatic(PUBLIC)))
    .use(router.routes())
    .use(router.allowedMethods())

  const server = http.createServer(app.callback())
  console.log('Server now listenning', { port: PORT })
  server.listen(PORT)
}

main()
