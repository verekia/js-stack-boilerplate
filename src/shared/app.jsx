import React from 'react'

import { Route } from 'react-router-dom'

import Nav from './component/nav'
import HomePage from './component/page/home'
import DogPage from './component/page/dog'
import DogAsyncPage from './component/page/dog-async'

const App = () =>
  <div>
    <Nav />
    <Route exact path="/" render={() => <HomePage title="Home" />} />
    <Route path="/dog" render={() => <DogPage title="Dog" />} />
    <Route path="/dog-async" render={() => <DogAsyncPage title="Dog Async" />} />
  </div>

export default App
