// @flow

import { protect } from '_server/server-util'

export const noteSchema = `
  type Note {
    id: ID!
    title: String!
    description: String
  }

  type Query {
    notes: [Note]
    note(id: ID!): Note
  }
`

const notes = [{ id: '123', title: 'Great title' }, { id: '234', title: 'Lame title' }]

export const noteResolvers = {
  notes: protect(() => notes),
  note: protect(({ id }) => notes.find(n => n.id === id)),
}
