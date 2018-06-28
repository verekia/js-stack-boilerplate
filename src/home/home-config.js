// @flow

import HomePage from 'home/cmp-page/home-page'

export const homePageConfig: Object = {
  route: {
    path: '/',
    exact: true,
    component: HomePage,
  },
  loggedOutOnly: true,
}
