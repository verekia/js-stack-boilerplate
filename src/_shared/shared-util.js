// @flow

export const filterPageConfigsByLoggedIn = (pageConfigs: Object[], isLoggedIn: boolean): Object[] =>
  pageConfigs.filter(pc => (isLoggedIn ? !pc.loggedOutOnly : !pc.loggedInOnly))
