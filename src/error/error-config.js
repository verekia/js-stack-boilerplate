// @flow

import { errorPath } from 'error/error-paths'
import ErrorPage from 'error/cmp-page/error-page'

export const errorPageConfig: Object = {
  route: {
    path: errorPath(),
    exact: true,
    component: ErrorPage,
  },
}
