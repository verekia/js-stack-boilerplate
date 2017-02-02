// @flow

import { createAction } from 'redux-actions'

export const BARK = 'BARK'

export const bark = createAction(BARK, message => message)
