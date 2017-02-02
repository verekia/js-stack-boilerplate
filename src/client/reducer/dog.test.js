/* eslint-disable no-undef, no-unused-expressions */

import { createStore, combineReducers } from 'redux'
import { expect } from 'chai'

import dogReducer from './dog'
import { makeBark } from '../action/dog'

let store

describe('Dog Reducer', () => {
  beforeEach(() => {
    store = createStore(combineReducers({
      dog: dogReducer,
    }))
  })
  describe('makeBark', () => {
    it('should make hasBarked go from false to true', () => {
      expect(store.getState().dog.get('hasBarked')).to.be.false
      store.dispatch(makeBark())
      expect(store.getState().dog.get('hasBarked')).to.be.true
    })
  })
})
