/* eslint-disable no-undef */

import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

import { barkAsync, barkAsyncRequest, barkAsyncSuccess, barkAsyncFailure } from './dog'
import routes from '../../shared/routes'

const mockStore = configureMockStore([thunkMiddleware])

afterEach(() => {
  fetchMock.restore()
})

test('barkAsync success', () => {
  fetchMock.get(routes.asyncBark, { message: 'Async bark success' })
  const store = mockStore()
  return store.dispatch(barkAsync())
    .then(() => {
      expect(store.getActions()).toEqual([
        barkAsyncRequest(),
        barkAsyncSuccess('Async bark success'),
      ])
    })
})

test('barkAsync 404', () => {
  fetchMock.get(routes.asyncBark, 404)
  const store = mockStore()
  return store.dispatch(barkAsync())
    .then(() => {
      expect(store.getActions()).toEqual([
        barkAsyncFailure(),
      ])
    })
})

test('barkAsync data error', () => {
  fetchMock.get(routes.asyncBark, {})
  const store = mockStore()
  return store.dispatch(barkAsync())
    .then(() => {
      expect(store.getActions()).toEqual([
        barkAsyncRequest(),
        barkAsyncFailure(),
      ])
    })
})
