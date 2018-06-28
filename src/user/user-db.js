// @flow

import knex from '_db/pg'

const USER = 'User'

export const createUser = (user: Object) => knex(USER).insert(user)

export const findUserByUsername = (username: string) =>
  knex(USER)
    .where({ username })
    .first()
