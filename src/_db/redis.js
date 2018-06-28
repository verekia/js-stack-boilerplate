// @flow

import { REDIS_URL } from '_server/env'
import { promisifyAll } from 'bluebird'
import Redis from 'redis'

promisifyAll(Redis)

const redis = Redis.createClient(REDIS_URL)
// eslint-disable-next-line no-console
redis.on('error', err => console.error(err))

export default redis
