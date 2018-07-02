// @flow

import ErrorPage from 'error/cmp-page/error-page'

export const errorPageConfig: Object = {
  route: {
    path: () => '/error',
    exact: true,
    component: ErrorPage,
  },
}
