// @flow

// flow-disable-next-line
import graphqlHTTP from 'koa-graphql'
// flow-disable-next-line
import { buildSchema } from 'graphql'

import parseFields from '_shared/parse-fields'
import { fetchGraphQL } from '_shared/api-calls'
import renderPage from '_server/render-page'
import { DISABLE_SSL, isProd } from '_server/env'
import { getMatchAndRoute } from '_shared/routes'

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
      graphiql: !isProd,
    }),
  )

  router.get('/fake-error', () => {
    throw Error('Fake Server Error')
  })

  // Server-side only
  router.all('*', async (ctx, next) => {
    let pageData: Object = {}
    const { cookie } = ctx.req.headers
    const { match, route } = getMatchAndRoute(!!ctx.session.user, ctx.req.url)
    const { graphql, graphqlPost } = route
    // Because Heroku uses x-forwarded-proto, ctx.request.origin's protocol is always 'http'
    const baseUrl = `http${DISABLE_SSL ? '' : 's'}://${ctx.request.host}`

    try {
      if (ctx.method === 'GET' && graphql) {
        pageData = await fetchGraphQL({
          query: graphql.query,
          variables: graphql.mapParams ? graphql.mapParams(match.params) : match.params,
          baseUrl,
          cookie,
        })
        if (graphql.mapResp) {
          pageData = graphql.mapResp(pageData)
        }
      }
      if (ctx.method === 'POST' && graphqlPost) {
        const parsedFields = parseFields(ctx.request.body, graphqlPost.fieldTypes)
        const mutationResult = await fetchGraphQL({
          query: graphqlPost.query,
          variables: graphqlPost.mapFields ? graphqlPost.mapFields(parsedFields) : parsedFields,
          baseUrl,
          cookie,
        })
        if (mutationResult.errorMessage) {
          pageData = { prefill: ctx.request.body, ...mutationResult }
        } else if (graphqlPost.redirect) {
          ctx.redirect(graphqlPost.redirect(mutationResult))
          return
        }
      }
    } catch (err) {
      if (err.message === 'unauthorized') {
        ctx.redirect('/login')
        return
      }
      // eslint-disable-next-line no-console
      console.error(err)
    }

    renderPage(ctx, pageData)
  })
}

export default setUpRouting
