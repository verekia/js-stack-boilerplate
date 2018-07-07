// @flow

import { SERVER_ERROR_PATH } from 'error/error-paths'
import ServerErrorPage from 'error/cmp-page/server-error-page'
import NotFoundPage from 'error/cmp-page/not-found-page'

export const serverErrorRoute: Object = {
  route: {
    path: SERVER_ERROR_PATH,
    exact: true,
    component: ServerErrorPage,
  },
  title: 'Server Error',
}

export const notFoundRoute: Object = {
  route: { component: NotFoundPage },
  title: 'Not Found',
}
