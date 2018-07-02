// @flow

import NotesPage from 'note/cmp-page/notes-page'
import NotePage from 'note/cmp-page/note-page'
import NotesIcon from '@material-ui/icons/Description'

export const notesPageConfig: Object = {
  route: {
    path: () => '/',
    component: NotesPage,
    exact: true,
  },
  graphql: {
    query: '{ notes { id, title, description } }',
  },
  title: 'Notes',
  showInNav: true,
  icon: NotesIcon,
}

export const notePageConfig: Object = {
  route: {
    path: (id: ?string) => `/note/${id || ':id'}`,
    component: NotePage,
    exact: true,
  },
  graphql: {
    query: 'query ($id: ID!) { note(id: $id) { id, title, description } }',
    urlParamsToVars: ({ id }: { id: string }) => ({ id }),
  },
}
