// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Route, Switch } from 'react-router-dom'

import Nav from 'app/cmp/nav-cmp'
import routes from '_shared/routes'
import NotFoundPage from 'error/cmp-page/not-found-page'

const App = () => (
  <div>
    <Helmet>
      <title>App</title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />>
    </Helmet>
    <Nav />
    <Switch>
      {routes.map(({ path, exact, component }) => (
        <Route key={path} path={path} exact={exact} component={component} />
      ))}
      <Route component={NotFoundPage} />
    </Switch>
  </div>
)

// About the warning in the console:
// https://github.com/ReactTraining/react-router/issues/6056
// https://github.com/reduxjs/react-redux/issues/914

export default App
