// @flow

import { matchPath } from 'react-router-dom'

import knex from '_db/pg'
// flow-disable-next-line
import graphqlHTTP from 'koa-graphql'
// flow-disable-next-line
import { buildSchema } from 'graphql'

import { fetchGraphQL } from '_shared/api-calls'
import { allPageRoutes } from '_shared/shared-config'
import renderPage from '_server/render-page'

const graphqlSchema = buildSchema(`
  type Note {
    id: ID!
    name: String
  }

  type Query {
    notes: [Note]
    note(id: ID!): Note
  }
`)

const protect = (fn: Function) => (vars, ctx, ...rest) => {
  console.log(ctx.session)
  return fn(vars, ctx, ...rest)
}

const root = {
  notes: protect(() => []),
  note: protect(({ id }) => [].find(d => d.id === id)),
}

const setUpRouting = (router: Object) => {
  router.all(
    '/graphql',
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: root,
      graphiql: true,
    }),
  )

  router.get('/logout', ctx => {
    ctx.session = null
    ctx.redirect('/')
  })

  router.get('/fake-error', () => {
    throw Error('Fake Internal Server Error')
  })

  router.get('*', async (ctx, next) => {
    let match = {}

    const activeRoute: Object =
      allPageRoutes.find(route => {
        match = matchPath(ctx.req.url, route)
        return match
      }) || {}

    if (ctx.req.url.startsWith('/static')) {
      next()
      return
    }

    const queryVariables = activeRoute.getVariables && activeRoute.getVariables(match.params)
    let pageData
    try {
      pageData = activeRoute.query && (await fetchGraphQL(activeRoute.query, queryVariables))
    } catch (err) {
      ctx.redirect('/unauthorized')
      return
    }

    renderPage(ctx, pageData)
  })
}

export default setUpRouting
