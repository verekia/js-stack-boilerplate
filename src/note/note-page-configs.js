// @flow

import NotesIcon from '@material-ui/icons/Description'

import { notesRoute, noteRoute } from 'note/note-routes'

export const notesPageConfig: Object = {
  route: notesRoute,
  loggedInOnly: true,
  title: 'Notes',
  graphql: { query: '{ getNotes { id, title, description } }' },
  mainDataPropName: 'notes',
  Icon: NotesIcon,
  inNav: true,
}

export const notePageConfig: Object = {
  route: noteRoute,
  loggedInOnly: true,
  title: ({ title }) => title,
  graphql: { query: 'query ($id: ID!) { getNote(id: $id) { id, title, description } }' },
}
