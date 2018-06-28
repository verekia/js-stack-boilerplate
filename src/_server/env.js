// @flow

import 'dotenv/config'
import readEnv from 'read-env'

const env = readEnv({ transformKey: false })

env.isProd = process.env.NODE_ENV === 'production'

// To be able to do: import { something } from '_server/env'
module.exports = env
