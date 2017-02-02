// @flow

import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'

export const BARK = 'BARK'

export const bark = createAction(BARK, message => message)

export const barkAsync = () => (dispatch: Function) => {
  fetch('/async/bark', { method: 'GET' })
    .then(res => res.json())
    .then((data) => {
      dispatch(bark(data.message))
    })
}
