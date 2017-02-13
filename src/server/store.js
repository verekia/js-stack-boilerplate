import * as Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import dogReducer from '../shared/reducer/dog'

export default (initialState: Object) => createStore(combineReducers({
  dog: dogReducer,
}), {
  dog: Immutable.fromJS({
    barkMessage: initialState.barkMessage,
  }),
}, applyMiddleware(thunkMiddleware))
