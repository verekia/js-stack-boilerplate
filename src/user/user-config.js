// @flow

import React from 'react'
import { Redirect } from 'react-router'
import LogoutIcon from '@material-ui/icons/ExitToApp'

import { homePageConfig } from 'home/home-config'
import LoginPage from 'user/cmp-page/login-page'
import SignupPage from 'user/cmp-page/signup-page'

export const loginPageConfig: Object = {
  route: {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  title: 'Log In',
  loggedOutOnly: true,
}

export const signupPageConfig: Object = {
  route: {
    path: '/signup',
    exact: true,
    component: SignupPage,
  },
  title: 'Sign Up',
  loggedOutOnly: true,
}

export const logoutConfig: Object = {
  route: {
    path: '/logout',
    exact: true,
    component: <Redirect to={homePageConfig.route.path} />,
  },
  title: 'Log Out',
  icon: LogoutIcon,
}
