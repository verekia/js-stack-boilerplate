/* eslint-disable no-undef, no-unused-expressions */

import { createStore, combineReducers } from 'redux'
import { expect } from 'chai'

import dogReducer from './dog'
import { bark } from '../action/dog'

let store

describe('Dog Reducer', () => {
  beforeEach(() => {
    store = createStore(combineReducers({
      dog: dogReducer,
    }))
  })
  describe('makeBark', () => {
    it('should change barkMessage', () => {
      expect(store.getState().dog.get('barkMessage')).to.equal('The dog is quiet')
      store.dispatch(bark('Wah wah!'))
      expect(store.getState().dog.get('barkMessage')).to.equal('Wah wah!')
    })
  })
})
