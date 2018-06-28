// @flow

import { matchPath } from 'react-router-dom'

// flow-disable-next-line
import graphqlHTTP from 'koa-graphql'
// flow-disable-next-line
import { buildSchema } from 'graphql'

import { fetchGraphQL } from '_shared/api-calls'
import { allPageRoutes } from '_shared/shared-config'
import renderPage from '_server/render-page'

import { noteSchema, noteResolvers } from 'note/note-ctrl'
import authRouting from 'auth/auth-routing'

const combinedSchemas = [noteSchema].join(' ')
const combinedResolvers = { ...noteResolvers }

const setUpRouting = (router: Object) => {
  authRouting(router)

  router.all(
    '/graphql',
    graphqlHTTP({
      schema: buildSchema(combinedSchemas),
      rootValue: combinedResolvers,
      graphiql: true,
    }),
  )

  router.get('/fake-error', () => {
    throw Error('Fake Server Error')
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
