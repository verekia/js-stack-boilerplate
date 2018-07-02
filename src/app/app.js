// @flow

import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import Nav from 'app/cmp/nav-cmp'
import { allPageRoutesExceptRoot } from '_shared/shared-config'
import NotFoundPage from 'error/cmp-page/not-found-page'
import WelcomePage from 'welcome/cmp-page/welcome-page'
import NotesPage from 'note/cmp-page/notes-page'

const mstp = ({ general }) => ({ isLoggedIn: !!general.user })

const BASE_TITLE = 'My Notes'

const App = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <div>
    <Helmet titleTemplate={`%s | ${BASE_TITLE}`} defaultTitle={BASE_TITLE}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    </Helmet>
    {isLoggedIn && <Nav />}
    <Switch>
      <Route path="/" exact={true} component={isLoggedIn ? NotesPage : WelcomePage} />
      {allPageRoutesExceptRoot.map(
        ({
          path,
          exact,
          component: Cmp,
          ...rest
        }: {
          path: Function,
          exact?: boolean,
          component: Function,
        }) => (
          // <Route key={path()} path={path()} exact={exact} component={component} />
          <Route
            key={path()}
            path={path()}
            exact={exact}
            render={props => <Cmp {...props} {...rest} />}
          />
        ),
      )}
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
