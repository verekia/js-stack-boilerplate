// @flow

import { serverErrorRoute, notFoundRoute } from 'error/error-routes'

export const serverErrorPageConfig: Object = {
  route: serverErrorRoute,
  title: 'Server Error',
}

export const notFoundPageConfig: Object = {
  route: notFoundRoute,
  title: 'Not Found',
}
