// @flow

import LoginPage from 'auth/cmp-page/login-page'
import { loginPath } from 'auth/auth-paths'
import { loginTitle } from 'auth/auth-titles'

export const loginPageConfig: Object = {
  route: {
    path: loginPath(),
    exact: true,
    component: LoginPage,
  },
  createTitle: loginTitle,
}
