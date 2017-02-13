import React from 'react'

import { Route } from 'react-router-dom'

import Nav from './component/nav'
import HomePage from './component/page/home'
import DogPage from './component/page/dog'
import DogAsyncPage from './component/page/dog-async'

const App = () =>
  <div>
    <Nav />
    <Route exact path="/" render={() => <HomePage />} />
    <Route path="/dog" render={() => <DogPage />} />
    <Route path="/dog-async" render={() => <DogAsyncPage />} />
  </div>

export default App
