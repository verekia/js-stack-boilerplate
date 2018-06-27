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
import graphqlHTTP from 'koa-graphql'
import { buildSchema } from 'graphql'

import routes from '_shared/routes'
import { fetchGraphQL } from '_shared/api-calls'

import App from 'app/app'

const PORT = 8000
const IS_PROD = false

const dogs = [{ id: '123', name: 'Medor' }, { id: '456', name: 'Max' }]

const graphqlSchema = buildSchema(`
  type Dog {
    id: ID!
    name: String
  }

  type Query {
    dogs: [Dog]
    dog(id: ID!): Dog
  }
`)

const root = {
  dogs: () => dogs,
  dog: ({ id }) => dogs.find(d => d.id === id),
}

const getGeneralData = ctx => ({
  username: 'Sven',
})

const main = async () => {
  const app = new Koa()
  const router = new Router()

  router.all(
    '/graphql',
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: root,
      graphiql: true,
    }),
  )

  router.get('*', async (ctx, next) => {
    let match = {}

    const activeRoute: Object =
      routes.find(route => {
        match = matchPath(ctx.req.url, route)
        return match
      }) || {}

    if (ctx.req.url.startsWith('/static')) {
      next()
      return
    }
    const queryVariables = activeRoute.getVariables && activeRoute.getVariables(match.params)
    const pageData = activeRoute.query ? await fetchGraphQL(activeRoute.query, queryVariables) : {}
    const store = createStore(() => ({ page: pageData, general: getGeneralData(ctx) }))
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
        <div id="app">${appHtml}</div>
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
