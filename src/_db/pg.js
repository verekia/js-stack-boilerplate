// @flow

import { DATABASE_URL, USE_SSL_DB } from '_server/env'

import Knex from 'knex'
import pg from 'pg'

pg.defaults.ssl = USE_SSL_DB

export default Knex({
  client: 'pg',
  connection: DATABASE_URL,
  migrations: { directory: './migrations' },
})
