// @flow

import 'babel-polyfill'

import * as Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import App from '../shared/app'
import dogReducer from '../shared/reducer/dog'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

const store = createStore(combineReducers({
  dog: dogReducer,
}), {
  dog: Immutable.fromJS(preloadedState.dog),
}, composeEnhancers(applyMiddleware(thunkMiddleware)))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.querySelector('.app'),
)
