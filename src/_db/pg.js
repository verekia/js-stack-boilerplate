// @flow

import Knex from 'knex'
import exitHook from 'async-exit-hook'

import knexConfig from '_db/knex-config'

const knex = Knex(knexConfig)

exitHook(async callback => {
  await knex.destroy()
  callback()
})

export default knex
