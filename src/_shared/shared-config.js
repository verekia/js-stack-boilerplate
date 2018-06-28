// @flow

import { homePageConfig } from 'home/home-config'
import { notesPageConfig, notePageConfig } from 'note/note-config'
import { loginPageConfig } from 'auth/auth-config'

export const APP_NAME = 'Hello App'

export const allPageConfigs = [homePageConfig, loginPageConfig, notesPageConfig, notePageConfig]

// flow-disable-next-line
export const allPageRoutes = allPageConfigs.map(c => c.route)
