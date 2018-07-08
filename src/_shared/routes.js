// @flow

import { matchPath } from 'react-router-dom'

import { loginRoute, logoutRoute } from 'auth/auth-routes'
import { serverErrorRoute, notFoundRoute } from 'error/error-routes'
import { welcomeRoute } from 'welcome/welcome-routes'
import { notesRoute, noteRoute, newNoteRoute } from 'note/note-routes'

export const allRoutes = [
  welcomeRoute,
  loginRoute,
  notesRoute,
  noteRoute,
  newNoteRoute,
  logoutRoute,
  serverErrorRoute,
  notFoundRoute,
]

export const getRoutes = (isLoggedIn: boolean): Object[] =>
  allRoutes.filter(r => (isLoggedIn ? !r.loggedOutOnly : !r.loggedInOnly))

export const getActiveRoute = (isLoggedIn: boolean, path: string) =>
  getRoutes(isLoggedIn).find(({ route }) => route && route.path === path) || notFoundRoute

export const getMatchAndRoute = (isLoggedIn: boolean, url: string) => {
  let match: Object = {}
  const activeRoute: Object =
    getRoutes(isLoggedIn).find(({ route }) => {
      match = matchPath(url, route)
      return match
    }) || notFoundRoute
  return { match, route: activeRoute }
}

export const getTitle = (route: Object, pageData: Object) => {
  if (route.title) {
    return typeof route.title === 'function' ? route.title(pageData) : route.title
  }
  return undefined
}
