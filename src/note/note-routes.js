// @flow

import NotesPage from 'note/cmp-page/notes-page'
import NotePage from 'note/cmp-page/note-page'

import { NOTES_PATH, notePath } from 'note/note-paths'

export const notesRoute = {
  path: NOTES_PATH,
  exact: true,
  component: NotesPage,
}

export const noteRoute = {
  path: notePath(),
  exact: true,
  component: NotePage,
}
