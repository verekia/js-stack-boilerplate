// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import BarkButton from './container/bark-buttons'
import BarkMessage from './container/bark-message'
import dogReducer from './reducer/dog'

/* eslint-disable no-underscore-dangle */
const store = createStore(combineReducers({
  dog: dogReducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
/* eslint-enable no-underscore-dangle */

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BarkMessage />
      <BarkButton />
    </div>
  </Provider>
  , document.querySelector('.js-app'),
)
