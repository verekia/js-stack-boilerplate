// @flow

import { WELCOME_PATH } from 'welcome/welcome-paths'
import WelcomePage from 'welcome/cmp-page/welcome-page'

export const welcomeRoute: Object = {
  route: {
    path: WELCOME_PATH,
    exact: true,
    Cmp: WelcomePage,
  },
  loggedOutOnly: true,
}
