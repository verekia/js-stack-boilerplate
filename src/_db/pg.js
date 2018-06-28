// @flow

import { env } from '_server/setup'

import uuid from 'uuid/v4'
import Knex from 'knex'
import pg from 'pg'

pg.defaults.ssl = env.USE_SSL_DB

export const knex = Knex({
  client: 'pg',
  connection: env.DATABASE_URL,
  migrations: { directory: './migrations' },
})

const main = async () => {
  try {
    await knex('Note').insert({ id: uuid(), title: 'Great note', description: 'Great description' })
  } catch (e) {
    console.error(e)
  }
  console.log(await knex('Note'))
  knex.destroy()
}

main()
