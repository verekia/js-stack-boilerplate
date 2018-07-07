// @flow

import LogoutIcon from '@material-ui/icons/PowerSettingsNew'

import { LOGIN_PATH, LOGOUT_PATH } from 'auth/auth-paths'
import LoginPage from 'auth/cmp-page/login-page'

export const loginRoute: Object = {
  route: {
    path: LOGIN_PATH,
    exact: true,
    component: LoginPage,
  },
  title: 'Log In',
}

export const logoutRoute: Object = {
  htmlHref: LOGOUT_PATH,
  title: 'Log Out',
  Icon: LogoutIcon,
  inNav: true,
}
