// @flow

// flow-disable-next-line
import graphqlHTTP from 'koa-graphql'
// flow-disable-next-line
import { buildSchema } from 'graphql'

import { fetchGraphQL } from '_shared/api-calls'
import renderPage from '_server/render-page'
import { DISABLE_SSL } from '_server/env'
import { getMatchAndRoute } from '_shared/routes'

import { noteSchema, noteResolvers } from 'note/note-ctrl'
import authRouting from 'auth/auth-routing'

const combinedSchemas = [noteSchema].join(' ')
const combinedResolvers = { ...noteResolvers }

const graphqlCall = async (
  graphql: Object,
  params: Object,
  baseUrl: string,
  cookie: string,
): Object => {
  const queryVariables = graphql.mapParams ? graphql.mapParams(params) : params
  return fetchGraphQL({
    baseUrl,
    query: graphql.query,
    variables: queryVariables,
    cookie,
  })
}

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

  // Server-side rendering
  router.get('*', async (ctx, next) => {
    const { url } = ctx.req
    const { cookie } = ctx.req.headers

    // Because Heroku uses x-forwarded-proto, ctx.request.origin's protocol is always 'http'
    const baseUrl = `http${DISABLE_SSL ? '' : 's'}://${ctx.request.host}`

    if (url.startsWith('/static')) {
      next()
      return
    }

    let pageData = {}

    const { match, route } = getMatchAndRoute(!!ctx.session.user, url)
    const { graphql } = route

    if (graphql) {
      try {
        pageData = await graphqlCall(graphql, match.params, baseUrl, cookie)
        if (graphql.mapResp) {
          pageData = graphql.mapResp(pageData)
        }
      } catch (err) {
        if (err.message === 'unauthorized') {
          ctx.redirect('/login')
          return
        }
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }

    renderPage(ctx, pageData)
  })
}

export default setUpRouting
