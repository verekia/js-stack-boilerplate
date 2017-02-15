// @flow

import * as Immutable from 'immutable'

import { BARK, BARK_ASYNC_REQUEST, BARK_ASYNC_SUCCESS, BARK_ASYNC_FAILURE } from '../action/dog'

const initialState = Immutable.fromJS({
  barkMessage: 'The dog is quiet',
  barkMessageAsync: 'The dog is quiet (async)',
})

const dogReducer = (state: Object = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case BARK:
      return state.set('barkMessage', action.payload)
    case BARK_ASYNC_REQUEST:
      return state.set('barkMessageAsync', '...')
    case BARK_ASYNC_SUCCESS:
      return state.set('barkMessageAsync', action.payload)
    case BARK_ASYNC_FAILURE:
      return state.set('barkMessageAsync', 'Could not bark, please check your connection')
    default:
      return state
  }
}

export default dogReducer
