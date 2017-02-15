import React from 'react'

import { Route } from 'react-router-dom'

import HelloPage from './component/page/hello'
import HelloAsyncPage from './component/page/hello-async'
import HomePage from './component/page/home'
import Nav from './component/nav'

const App = () =>
  <div>
    <Nav />
    <Route exact path="/" render={() => <HomePage />} />
    <Route path="/hello" render={() => <HelloPage />} />
    <Route path="/hello-async" render={() => <HelloAsyncPage />} />
  </div>

export default App
