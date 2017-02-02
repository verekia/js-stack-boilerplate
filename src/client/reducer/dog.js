// @flow

import * as Immutable from 'immutable'
import { MAKE_BARK } from '../action/dog'

const initialState = Immutable.fromJS({
  hasBarked: false,
})

const dogReducer = (state: Object = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case MAKE_BARK:
      return state.set('hasBarked', action.payload)
    default:
      return state
  }
}

export default dogReducer
