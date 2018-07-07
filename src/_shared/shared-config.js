// @flow

import { loginPageConfig, logoutPageConfig } from 'auth/auth-page-configs'
import { serverErrorPageConfig, notFoundPageConfig } from 'error/error-page-configs'
import { welcomePageConfig } from 'welcome/welcome-page-configs'
import { notesPageConfig, notePageConfig } from 'note/note-page-configs'

export const allPageConfigs = [
  welcomePageConfig,
  loginPageConfig,
  notesPageConfig,
  notePageConfig,
  logoutPageConfig,
  serverErrorPageConfig,
  notFoundPageConfig,
]
