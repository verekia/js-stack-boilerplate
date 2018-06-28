// @flow

import uuid from 'uuid/v4'

import knex from '_db/pg'

const NOTE = 'Note'

export const createNote = (userId: string, note: Object) =>
  knex(NOTE).insert({ ...note, id: uuid(), userId })

export const getAllNotes = (userId: string) => knex(NOTE).where({ userId })

export const findNote = (userId: string, id: string) =>
  knex(NOTE)
    .where({ userId, id })
    .first()

export const updateNote = (userId: string, id: string, note: Object) =>
  knex(NOTE)
    .update({ ...note, updatedAt: knex.fn.now() })
    .where({ userId, id })

export const deleteNote = (userId: string, id: string) =>
  knex(NOTE)
    .where({ userId, id })
    .del()
