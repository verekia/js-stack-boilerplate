// @flow

import uuid from 'uuid/v4'

import knex from '_db/pg'

const NOTE = 'Note'

export const getAllNotes = (userId: string) => knex(NOTE).where({ userId })

export const findNote = (userId: string, id: string) =>
  knex(NOTE)
    .where({ userId, id })
    .first()

export const createNote = async (userId: string, input: Object) => {
  const id = uuid()
  await knex(NOTE).insert({ ...input, id, userId })
  return id
}

export const updateNote = async (userId: string, id: string, input: Object) =>
  !!(await knex(NOTE)
    .update({ ...input, updatedAt: knex.fn.now() })
    .where({ userId, id }))

export const deleteNote = async (userId: string, id: string) =>
  !!(await knex(NOTE)
    .where({ userId, id })
    .del())
