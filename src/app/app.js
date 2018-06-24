// @flow

import React from 'react'
import Helmet from 'react-helmet'

import Nav from 'app/cmp/nav-cmp'

// import { Switch } from 'react-router'
// import { Route } from 'react-router-dom'
// import Helmet from 'react-helmet'

// import HelloPage from '_shared/component/page/hello'
// import HelloAsyncPage from '_shared/component/page/hello-async'
// import HomePage from '_shared/component/page/home'
// import Footer from '_shared/component/footer'
// import Nav from '_shared/component/nav'
// import NotFoundPage from '_shared/component/page/not-found'
// import { APP_NAME } from '_shared/config'
// import { HOME_PAGE_ROUTE, HELLO_PAGE_ROUTE, HELLO_ASYNC_PAGE_ROUTE } from '_shared/routes'

// const AppJSX = () => (
//   <div style={{ paddingTop: 54 }}>
//     <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
//     <Nav />
//     <Switch>
//       <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
//       <Route path={HELLO_PAGE_ROUTE} render={() => <HelloPage />} />
//       <Route path={HELLO_ASYNC_PAGE_ROUTE} render={() => <HelloAsyncPage />} />
//       <Route component={NotFoundPage} />
//     </Switch>
//     <Footer />
//   </div>
// )

const App = () => (
  <div>
    <Helmet>
      <title>My Title</title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />>
    </Helmet>
    <Nav />
    <h1>App</h1>
  </div>
)

export default App
