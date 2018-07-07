// @flow

import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import Nav from 'app/cmp/nav-cmp'
import { getRoutes, getMatchAndRoute, getTitle } from '_shared/routes'

const mstp = ({ general, page }) => ({ isLoggedIn: !!general.user, pageData: page })

type Props = {
  isLoggedIn: boolean,
  location: Object,
  pageData: Object,
}

const App = ({ isLoggedIn, location, pageData }: Props) => {
  const { route: activeRoute } = getMatchAndRoute(isLoggedIn, location.pathname)
  const title = getTitle(activeRoute, pageData)
  return (
    <div>
      <Helmet
        titleTemplate={`%s | Notesapp`}
        defaultTitle={'Notesapp – Great Notes for Great People'}
      >
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Helmet>
      {isLoggedIn && <Nav title={title} />}
      <Switch>
        {getRoutes(isLoggedIn).map(({ route }) => (
          <Route key={(route && route.path) || 'not-found-key'} {...route} />
        ))}
      </Switch>
    </div>
  )
}

export default compose(
  withRouter,
  connect(mstp),
)(App)
