// @flow

import { matchPath } from 'react-router-dom'

// flow-disable-next-line
import graphqlHTTP from 'koa-graphql'
// flow-disable-next-line
import { buildSchema } from 'graphql'

import { fetchGraphQL } from '_shared/api-calls'
import { allPageConfigsExceptRoot } from '_shared/shared-config'
import renderPage from '_server/render-page'

import { noteSchema, noteResolvers } from 'note/note-ctrl'
import authRouting from 'auth/auth-routing'
import { notesPageConfig } from 'note/note-config'

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
    let activeConfig: Object =
      allPageConfigsExceptRoot.find(({ route }) => {
        match = matchPath(url, route)
        return match
      }) || {}

    // (if not logged out homepage)
    if (!(ctx.req.url === '/' && !ctx.session.user)) {
      if (ctx.req.url === '/') {
        match = matchPath(ctx.req.url, notesPageConfig.route)
        activeConfig = notesPageConfig
      }
      if (activeConfig.graphql) {
        try {
          pageData = await graphqlCall(activeConfig.graphql, match.params, baseUrl, cookie)
        } catch (err) {
          if (err.message === 'unauthorized') {
            ctx.redirect('/login')
            return
          }
          // eslint-disable-next-line no-console
          console.error(err)
        }
      }
    }

    if (activeConfig.createTitle) {
      pageData.title = activeConfig.createTitle(pageData)
    }

    renderPage(ctx, pageData)
  })
}

export default setUpRouting
