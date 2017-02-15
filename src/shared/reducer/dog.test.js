/* eslint-disable no-undef */

import { bark, barkAsyncRequest, barkAsyncSuccess, barkAsyncFailure } from '../action/dog'
import dogReducer from './dog'

let dogState

beforeEach(() => {
  dogState = dogReducer(undefined, {})
})

test('handle default', () => {
  expect(dogState.get('barkMessage')).toBe('The dog is quiet')
  expect(dogState.get('barkMessageAsync')).toBe('The dog is quiet (async)')
})

test('handle BARK', () => {
  dogState = dogReducer(dogState, bark('Bark test'))
  expect(dogState.get('barkMessage')).toBe('Bark test')
})

test('handle BARK_ASYNC_REQUEST', () => {
  dogState = dogReducer(dogState, barkAsyncRequest())
  expect(dogState.get('barkMessageAsync')).toBe('...')
})

test('handle BARK_ASYNC_SUCCESS', () => {
  dogState = dogReducer(dogState, barkAsyncSuccess('Bark test'))
  expect(dogState.get('barkMessageAsync')).toBe('Bark test')
})

test('handle BARK_ASYNC_FAILURE', () => {
  dogState = dogReducer(dogState, barkAsyncFailure())
  expect(dogState.get('barkMessageAsync')).toBe('Could not bark, please check your connection')
})
