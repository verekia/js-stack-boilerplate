// @flow

import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import Nav from 'app/cmp/nav-cmp'
import { allPageRoutes } from '_shared/shared-config'
import NotFoundPage from 'error/cmp-page/not-found-page'

const mstp = ({ general }) => ({ isLoggedIn: !!general.user })

const App = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <div>
    <Helmet>
      <title>App</title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />>
    </Helmet>
    {isLoggedIn && <Nav />}
    <Switch>
      {allPageRoutes.map(
        ({
          path,
          exact,
          component: Cmp,
          ...rest
        }: {
          path: string,
          exact?: boolean,
          component: Function,
        }) => (
          // <Route key={path} path={path} exact={exact} component={component} />
          <Route
            key={path}
            path={path}
            exact={exact}
            render={props => <Cmp {...props} {...rest} />}
          />
        ),
      )}
      {/* <Route component={NotFoundPage} /> */}
      <Route render={props => <NotFoundPage {...props} />} />
    </Switch>
  </div>
)

// Using component={component} instead of render causes a warning in the console, related to:
// https://github.com/ReactTraining/react-router/issues/6056
// https://github.com/reduxjs/react-redux/issues/914

export default compose(
  withRouter,
  connect(mstp),
)(App)
