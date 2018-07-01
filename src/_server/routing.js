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

const graphqlCall = async (url: String, cookie: string) => {
  let match = {}

  const activeConfig: Object =
    allPageConfigsExceptRoot.concat(notesPageConfig).find(({ route }) => {
      match = matchPath(url, route)
      return match
    }) || {}

  if (activeConfig.graphql) {
    const queryVariables =
      activeConfig.graphql.urlParamsToVars && activeConfig.graphql.urlParamsToVars(match.params)
    return fetchGraphQL(activeConfig.graphql.query, queryVariables, cookie)
  }
  return undefined
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
    if (ctx.req.url.startsWith('/static')) {
      next()
      return
    }

    let pageData

    // (if not logged out homepage)
    if (!(ctx.req.url === '/' && !ctx.session.user)) {
      try {
        pageData = await graphqlCall(ctx.req.url, ctx.req.headers.cookie)
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
