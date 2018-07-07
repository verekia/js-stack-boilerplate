// @flow

import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import Nav from 'app/cmp/nav-cmp'
import { allPageConfigs } from '_shared/shared-config'
import { notFoundPageConfig } from 'error/error-page-configs'
import { filterPageConfigsByLoggedIn } from '_shared/shared-util'

const mstp = ({ general }) => ({ isLoggedIn: !!general.user })

const App = ({ isLoggedIn, location }: { isLoggedIn: boolean, location: Object }) => {
  const pageConfig =
    filterPageConfigsByLoggedIn(allPageConfigs, isLoggedIn).find(
      ({ route }) => location.pathname === route.path,
    ) || notFoundPageConfig
  return (
    <div>
      <Helmet
        titleTemplate={`%s | Notesapp`}
        defaultTitle={'Notesapp – Great Notes for Great People'}
      >
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Helmet>
      {isLoggedIn && <Nav pageConfig={pageConfig} />}
      <Switch>
        {filterPageConfigsByLoggedIn(allPageConfigs, isLoggedIn).map(({ route }) => (
          <Route key={route.path || 'not-found-key'} {...route} />
        ))}
      </Switch>
    </div>
  )
}

export default compose(
  withRouter,
  connect(mstp),
)(App)
