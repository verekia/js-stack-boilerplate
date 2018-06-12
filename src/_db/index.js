// @flow

import { env } from '_server/setup'

import uuid from 'uuid/v4'
import Knex from 'knex'
import pg from 'pg'

pg.defaults.ssl = env.useSslDb

export const knex = Knex({
  client: 'pg',
  connection: env.databaseUrl,
  migrations: { directory: './migrations' },
})

const main = async () => {
  try {
    await knex('Dog').insert({ id: uuid(), name: 'Fido' })
  } catch (e) {
    console.error(e)
  }
  console.log(await knex('Dog'))
  knex.destroy()
}

main()
