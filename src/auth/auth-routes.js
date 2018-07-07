// @flow

import LoginPage from 'auth/cmp-page/login-page'
import { LOGIN_PATH } from 'auth/auth-paths'

export const loginRoute = {
  path: LOGIN_PATH,
  exact: true,
  component: LoginPage,
}
