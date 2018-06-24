// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

/*

import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { isProd } from '_shared/config'
import helloReducer from '_shared/reducer/hello'
import setUpSocket from '_client/socket'


/* eslint-disable no-underscore-dangle */
// const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
// const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

/*
const store = createStore(
  combineReducers({ hello: helloReducer }),
  { hello: preloadedState.hello },
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
)

const jssServerSide = document.getElementById('jss-ssr')
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide)

setUpSocket(store)
*/

const renderApp = () => {
  // eslint-disable-next-line global-require
  const App = require('../app/app').default
  // flow-disable-next-line
  ReactDOM.hydrate(<App />, document.getElementById('app-root'))
}

renderApp()

// flow-disable-next-line
if (module.hot) {
  module.hot.accept(renderApp)
}
