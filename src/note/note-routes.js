// @flow

import NotesIcon from '@material-ui/icons/Description'

import { NOTES_PATH, notePath } from 'note/note-paths'
import NotesPage from 'note/cmp-page/notes-page'
import NotePage from 'note/cmp-page/note-page'

export const notesRoute: Object = {
  route: {
    path: NOTES_PATH,
    exact: true,
    component: NotesPage,
  },
  loggedInOnly: true,
  title: 'Notes',
  graphql: {
    query: '{ getNotes { id, title, description } }',
    mapResp: ({ getNotes: notes }) => ({ notes }),
  },
  mainDataPropName: 'notes',
  Icon: NotesIcon,
  inNav: true,
}

export const noteRoute: Object = {
  route: {
    path: notePath(),
    exact: true,
    component: NotePage,
  },
  loggedInOnly: true,
  title: ({ note }) => note.title,
  graphql: {
    query: 'query ($id: ID!) { getNote(id: $id) { id, title, description } }',
    mapResp: ({ getNote: note }) => ({ note }),
  },
  mainDataPropName: 'note',
}
