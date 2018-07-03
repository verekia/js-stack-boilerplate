// @flow

import { welcomePath } from 'welcome/welcome-paths'
import WelcomePage from 'welcome/cmp-page/welcome-page'

export const welcomePageConfig: Object = {
  route: {
    path: welcomePath(),
    exact: true,
    component: WelcomePage,
  },
}
