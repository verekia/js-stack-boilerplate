// @flow

import { loginPath } from 'auth/auth-paths'
import LoginPage from 'auth/cmp-page/login-page'

export const loginPageConfig: Object = {
  route: {
    path: loginPath(),
    exact: true,
    component: LoginPage,
  },
  title: 'Log In',
}
