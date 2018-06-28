// @flow

import LoginPage from 'auth/cmp-page/login-page'

export const loginPageConfig: Object = {
  route: {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  title: 'Log In',
  loggedOutOnly: true,
}
