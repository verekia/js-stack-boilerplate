// @flow

import NotesPage from 'note/cmp-page/notes-page'
import NotePage from 'note/cmp-page/note-page'
import NotesIcon from '@material-ui/icons/Description'

import { noteGraphql, notesGraphql } from 'note/note-graphql'
import { notePath, notesPath } from 'note/note-paths'

export const notesPageConfig: Object = {
  route: {
    path: notesPath(),
    component: NotesPage,
    exact: true,
  },
  graphql: notesGraphql,
  title: 'Notes',
  showInNav: true,
  icon: NotesIcon,
}

export const notePageConfig: Object = {
  route: {
    path: notePath(),
    component: NotePage,
    exact: true,
  },
  graphql: noteGraphql,
}
