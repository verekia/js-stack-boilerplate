// @flow

import { protect } from '_server/server-util'
import { findNote, getAllNotes } from 'note/note-db'

export const noteSchema = `
  type Note {
    id: ID!
    title: String!
    description: String
  }

  type Query {
    getNotes: [Note]
    getNote(id: ID!): Note
  }
`

export const noteResolvers = {
  getNotes: protect(userId => getAllNotes(userId)),
  getNote: protect((userId, { id }) => findNote(userId, id)),
}
