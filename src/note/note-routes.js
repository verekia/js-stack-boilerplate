// @flow

import NotesIcon from '@material-ui/icons/Description'
import NewIcon from '@material-ui/icons/Create'

import { NOTES_PATH, NEW_NOTE_PATH, notePath } from 'note/note-paths'
import NotesPage from 'note/cmp-page/notes-page'
import NotePage from 'note/cmp-page/note-page'
import NewNotePage from 'note/cmp-page/new-note-page'

export const notesRoute: Object = {
  route: {
    path: NOTES_PATH,
    exact: true,
    Cmp: NotesPage,
  },
  loggedInOnly: true,
  title: 'Notes',
  graphql: {
    query: '{ getNotes { id, title, description } }',
    mapResp: ({ getNotes: notes }) => ({ notes }),
  },
  Icon: NotesIcon,
  inNav: true,
}

export const noteRoute: Object = {
  route: {
    path: notePath(),
    exact: true,
    Cmp: NotePage,
  },
  loggedInOnly: true,
  title: ({ note }) => (note ? note.title : 'Note not found'),
  graphql: {
    query: 'query ($id: ID!) { getNote(id: $id) { id, title, description } }',
    mapResp: ({ getNote: note }) => ({ note }),
  },
}

export const newNoteRoute: Object = {
  route: {
    path: NEW_NOTE_PATH,
    exact: true,
    Cmp: NewNotePage,
  },
  loggedInOnly: true,
  title: 'New Note',
  graphqlPost: {
    query: 'mutation ($input: NoteInput!) { createNote(input: $input) }',
    mapBody: body => ({ input: body }),
    redirect: ({ createNote: id }) => notePath(id),
  },
  Icon: NewIcon,
}
