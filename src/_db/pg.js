// @flow

import { env } from '_server/setup'

import Knex from 'knex'
import pg from 'pg'

pg.defaults.ssl = env.USE_SSL_DB

export default Knex({
  client: 'pg',
  connection: env.DATABASE_URL,
  migrations: { directory: './migrations' },
})
