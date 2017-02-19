// @flow

import compression from 'compression'
import express from 'express'

import routing from './routing'
import { WEB_PORT, STATIC_PATH } from '../shared/config'
import { isProd } from '../shared/util'

const server = express()

server.use(compression())
server.use(STATIC_PATH, express.static('dist'))
server.use(STATIC_PATH, express.static('public'))

routing(server)

server.listen(WEB_PORT, () => {
  /* eslint-disable no-console */
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
  /* eslint-enable no-console */
})
