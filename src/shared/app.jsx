import React from 'react'

import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'

import HelloPage from './component/page/hello'
import HelloAsyncPage from './component/page/hello-async'
import HomePage from './component/page/home'
import Nav from './component/nav'
import { APP_NAME } from './config'
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
} from './routes'

const App = () =>
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Nav />
    <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
    <Route path={HELLO_PAGE_ROUTE} render={() => <HelloPage />} />
    <Route path={HELLO_ASYNC_PAGE_ROUTE} render={() => <HelloAsyncPage />} />
  </div>

export default App
