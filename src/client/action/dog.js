// @flow

import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'
import routes from '../../shared/routes'

export const BARK = 'BARK'

export const bark = createAction(BARK, message => message)

export const barkAsync = () => (dispatch: Function) => {
  fetch(routes.asyncBark, { method: 'GET' })
    .then(res => res.json())
    .then((data) => {
      dispatch(bark(data.message))
    })
}
