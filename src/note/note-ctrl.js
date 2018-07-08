// @flow

import { protect } from '_server/server-util'
import { createNote, findNote, getAllNotes, updateNote, deleteNote } from 'note/note-db'

export const noteSchema = `
  input NoteInput {
    title: String
    description: String
  }

  type Note {
    id: ID!
    title: String!
    description: String
  }

  type Query {
    getNotes: [Note]
    getNote(id: ID!): Note
  }

  type Mutation {
    createNote(input: NoteInput): ID
    updateNote(id: ID!, input: NoteInput): Boolean
    deleteNote(id: ID!): Boolean
  }
`

export const noteResolvers = {
  getNotes: protect(userId => getAllNotes(userId)),
  getNote: protect((userId, { id }) => findNote(userId, id)),
  createNote: protect((userId, { input }) => createNote(userId, input)),
  updateNote: protect((userId, { id, input }) => updateNote(userId, id, input)),
  deleteNote: protect((userId, { id }) => deleteNote(userId, id)),
}
