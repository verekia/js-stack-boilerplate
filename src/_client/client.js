// @flow

import 'babel-polyfill'
import 'isomorphic-fetch'

import React from 'react'
import { hydrate } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import reducer from '_client/duck'

/*

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import setUpSocket from '_client/socket-client'

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

const jssServerSide = document.getElementById('jss-ssr')
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide)

setUpSocket(store)
*/

/* eslint-disable no-underscore-dangle */
const store = createStore(reducer, window.__PRELOADED_STATE__)

const renderApp = () => {
  // eslint-disable-next-line global-require
  const App = require('../app/app').default
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    // flow-disable-next-line
    document.getElementById('app'),
  )
}

renderApp()

// flow-disable-next-line
if (module.hot) {
  module.hot.accept(renderApp)
}
