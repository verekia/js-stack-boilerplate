// @flow

import { protect } from '_server/server-util'

export const noteSchema = `
  type Note {
    id: ID!
    name: String
  }

  type Query {
    notes: [Note]
    note(id: ID!): Note
  }
`

export const noteResolvers = {
  notes: protect(() => []),
  note: protect(({ id }) => [].find(d => d.id === id)),
}
