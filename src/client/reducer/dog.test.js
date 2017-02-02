/* eslint-disable no-undef, no-unused-expressions, import/no-extraneous-dependencies */

import { expect } from 'chai'
import fetchMock from 'fetch-mock'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { bark, barkAsync } from '../action/dog'
import dogReducer from './dog'

let store

describe('Dog Reducer', () => {
  beforeEach(() => {
    store = createStore(combineReducers({
      dog: dogReducer,
    }), applyMiddleware(thunkMiddleware))
  })
  describe('makeBark', () => {
    it('should change barkMessage', () => {
      expect(store.getState().dog.get('barkMessage')).to.equal('The dog is quiet')
      store.dispatch(bark('Wah wah!'))
      expect(store.getState().dog.get('barkMessage')).to.equal('Wah wah!')
    })
    it('should change barkMessage asynchronously', (done) => {
      fetchMock.get('/async/bark', { message: 'Async Mock' })
      let isLoading = true
      store.subscribe(() => {
        if (isLoading) {
          expect(store.getState().dog.get('barkMessage')).to.equal('...')
          isLoading = false
        } else {
          expect(store.getState().dog.get('barkMessage')).to.equal('Async Mock')
          fetchMock.restore()
          done()
        }
      })
      store.dispatch(barkAsync())
    })
  })
})
