// @flow

import { createAction } from 'redux-actions'
import { fetchGraphQL } from '_shared/api-calls'

const LOAD_PAGE_REQUEST = 'LOAD_PAGE_REQUEST'
const LOAD_PAGE_SUCCESS = 'LOAD_PAGE_SUCCESS'
const LOAD_PAGE_FAILURE = 'LOAD_PAGE_FAILURE'

const loadPageRequest = createAction(LOAD_PAGE_REQUEST)
const loadPageSuccess = createAction(LOAD_PAGE_SUCCESS)
const loadPageFailure = createAction(LOAD_PAGE_FAILURE)

type Options = {
  query?: string,
  variables?: Object,
  createTitle?: Function,
}

export const loadPage = ({ query, variables, createTitle }: Options) => async (
  dispatch: Function,
) => {
  dispatch(loadPageRequest())
  try {
    const pageData = query ? await fetchGraphQL({ query, variables }) : {}
    if (createTitle) {
      pageData.title = createTitle(pageData)
    }
    dispatch(loadPageSuccess(pageData))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    dispatch(loadPageFailure())
  }
}

const initialState = { page: {}, general: {} }

const reducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LOAD_PAGE_REQUEST:
      return { page: {}, general: { ...state.general, isLoading: true, hasError: false } }
    case LOAD_PAGE_SUCCESS:
      return { page: action.payload, general: { ...state.general, isLoading: false } }
    case LOAD_PAGE_FAILURE:
      return { ...state, general: { ...state.general, isLoading: false, hasError: true } }
    default:
      return state
  }
}

export default reducer
