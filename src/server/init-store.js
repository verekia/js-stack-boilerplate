import * as Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import helloReducer from '../shared/reducer/hello'

export default (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  if (plainPartialState) {
    if (plainPartialState.hello) {
      preloadedState.hello = helloReducer(undefined, {})
        .merge(Immutable.fromJS(plainPartialState.hello))
    }
  }

  return createStore(combineReducers({
    hello: helloReducer,
  }), preloadedState, applyMiddleware(thunkMiddleware))
}
