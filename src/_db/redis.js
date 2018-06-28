// @flow

import { promisifyAll } from 'bluebird'
import Redis from 'redis'
import exitHook from 'async-exit-hook'

import { REDIS_URL } from '_server/env'

promisifyAll(Redis)

const redis = Redis.createClient(REDIS_URL)
// eslint-disable-next-line no-console
redis.on('error', err => console.error(err))

exitHook(async callback => {
  await redis.quit()
  callback()
})

export default redis
