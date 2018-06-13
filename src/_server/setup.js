// @flow

import 'dotenv/config'
import readEnv from 'read-env'

export const env = readEnv({ transformKey: false })
