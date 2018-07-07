// @flow

import { matchPath } from 'react-router-dom'

// flow-disable-next-line
import graphqlHTTP from 'koa-graphql'
// flow-disable-next-line
import { buildSchema } from 'graphql'

import { fetchGraphQL } from '_shared/api-calls'
import { allPageConfigs } from '_shared/shared-config'
import renderPage from '_server/render-page'

import { noteSchema, noteResolvers } from 'note/note-ctrl'
import authRouting from 'auth/auth-routing'
import { filterPageConfigsByLoggedIn } from '_shared/shared-util'

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

  router.get('*', async (ctx, next) => {
    const { url } = ctx.req
    const { cookie } = ctx.req.headers
    const baseUrl = ctx.request.origin

    if (url.startsWith('/static')) {
      next()
      return
    }

    let pageData = {}

    let match = {}
    const pageConfig =
      filterPageConfigsByLoggedIn(allPageConfigs, !!ctx.session.user).find(({ route }) => {
        match = matchPath(url, route)
        return match
      }) || {}

    if (pageConfig.graphql) {
      try {
        pageData = await graphqlCall(pageConfig.graphql, match.params, baseUrl, cookie)
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
