/* eslint-disable import/no-extraneous-dependencies, global-require */

import 'babel-polyfill'

import * as Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import App from '../shared/app'
import helloReducer from '../shared/reducer/hello'
import { isProd } from '../shared/util'
import { emitHello, setUpSocket } from './socket'

import './non-react'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

const store = createStore(combineReducers({
  hello: helloReducer,
}), {
  hello: Immutable.fromJS(preloadedState.hello),
}, composeEnhancers(applyMiddleware(thunkMiddleware)))

const rootEl = document.querySelector('.js-app')

const wrapClientApp = AppComponent =>
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>

ReactDOM.render(wrapClientApp(App), rootEl)

if (module.hot) {
  module.hot.accept('../shared/app', () => {
    const NextApp = require('../shared/app').default
    ReactDOM.render(wrapClientApp(NextApp), rootEl)
  })
}

const jssServerSide = document.querySelector('.jss-ssr')
if (jssServerSide && jssServerSide.parentNode) {
  jssServerSide.parentNode.removeChild(jssServerSide)
}

setUpSocket(store)
emitHello()
