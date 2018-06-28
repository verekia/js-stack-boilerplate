// @flow

import Knex from 'knex'
import pg from 'pg'
import exitHook from 'async-exit-hook'

import { DATABASE_URL, USE_SSL_DB } from '_server/env'

pg.defaults.ssl = USE_SSL_DB

// TODO: Connection errors are silent

const knex = Knex({
  client: 'pg',
  connection: DATABASE_URL,
  migrations: { directory: './migrations' },
})

exitHook(async callback => {
  await knex.destroy()
  callback()
})

export default knex
