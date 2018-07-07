// @flow

import { SERVER_ERROR_PATH } from 'error/error-paths'
import ServerErrorPage from 'error/cmp-page/server-error-page'
import NotFoundPage from 'error/cmp-page/not-found-page'

export const serverErrorRoute: Object = {
  path: SERVER_ERROR_PATH,
  exact: true,
  component: ServerErrorPage,
}

export const notFoundRoute: Object = {
  component: NotFoundPage,
}
