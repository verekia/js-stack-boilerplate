// @flow

import LogoutIcon from '@material-ui/icons/PowerSettingsNew'

import { loginRoute } from 'auth/auth-routes'
import { LOGOUT_PATH } from 'auth/auth-paths'

export const loginPageConfig: Object = {
  route: loginRoute,
  title: 'Log In',
}

export const logoutPageConfig: Object = {
  htmlHref: LOGOUT_PATH,
  title: 'Log Out',
  Icon: LogoutIcon,
  inNav: true,
}
