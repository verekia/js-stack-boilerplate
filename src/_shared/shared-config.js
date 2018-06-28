// @flow

import { homePageConfig } from 'home/home-config'
import { notesPageConfig, notePageConfig } from 'note/note-config'
import { loginPageConfig, signupPageConfig } from 'user/user-config'

export const APP_NAME = 'Hello App'

export const allPageConfigs = [
  homePageConfig,
  signupPageConfig,
  loginPageConfig,
  notesPageConfig,
  notePageConfig,
]

// flow-disable-next-line
export const allPageRoutes = allPageConfigs.map(c => c.route)
