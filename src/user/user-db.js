// @flow

import uuid from 'uuid/v4'
import knex from '_db/pg'

const USER = 'User'

export const createUser = (user: Object) => knex(USER).insert({ ...user, id: uuid() })

export const findUserByUsername = (username: string) =>
  knex(USER)
    .where({ username })
    .first()
