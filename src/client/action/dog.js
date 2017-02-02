// @flow

/* eslint-disable no-console */

import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'
import routes from '../../shared/routes'

export const BARK = 'BARK'
export const BARK_ASYNC_REQUEST = 'BARK_ASYNC_REQUEST'
export const BARK_ASYNC_SUCCESS = 'BARK_ASYNC_SUCCESS'
export const BARK_ASYNC_FAILURE = 'BARK_ASYNC_FAILURE'

export const bark = createAction(BARK, message => message)
export const barkAsyncRequest = createAction(BARK_ASYNC_REQUEST)
export const barkAsyncSuccess = createAction(BARK_ASYNC_SUCCESS, message => message)
export const barkAsyncFailure = createAction(BARK_ASYNC_FAILURE)

export const barkAsync = () => (dispatch: Function) => {
  fetch(routes.asyncBark, { method: 'GET' })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText)
      }
      dispatch(barkAsyncRequest())
      return res
    })
    .then(res => res.json())
    .then(data => dispatch(barkAsyncSuccess(data.message)))
    .catch((error) => {
      console.error(error)
      dispatch(barkAsyncFailure())
    })
}
