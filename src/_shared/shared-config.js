// @flow

import { notePageConfig } from 'note/note-config'
import { loginPageConfig } from 'auth/auth-config'

export const allPageConfigsExceptRoot = [loginPageConfig, notePageConfig]

// flow-disable-next-line
export const allPageRoutesExceptRoot = allPageConfigsExceptRoot.map(c => c.route)
