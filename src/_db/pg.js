// @flow

import Knex from 'knex'
import exitHook from 'async-exit-hook'

import knexConfig from '_db/knex-config'

const knex = Knex(knexConfig)

// eslint-disable-next-line no-console
knex.raw('').catch(err => console.error(err))

exitHook(async callback => {
  await knex.destroy()
  callback()
})

export default knex
