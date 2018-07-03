// @flow

export const notesGraphql = {
  query: '{ notes { id, title, description } }',
}

export const noteGraphql = {
  query: 'query ($id: ID!) { note(id: $id) { id, title, description } }',
  mapParams: ({ id }: { id: string }) => ({ id }),
}
