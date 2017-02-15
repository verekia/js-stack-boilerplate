import * as Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import helloReducer from '../shared/reducer/hello'

export const initStore = (initialState: Object) => createStore(combineReducers({
  hello: helloReducer,
}), {
  hello: Immutable.fromJS(initialState),
}, applyMiddleware(thunkMiddleware))

export const defaultStore = {
  message: 'Server-side preloaded message',
  messageAsync: 'Server-side preloaded message for async page',
}
