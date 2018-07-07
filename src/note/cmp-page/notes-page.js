// @flow

import React from 'react'
import { compose } from 'recompose'
import { notePath } from 'note/note-paths'
import { Link } from 'react-router-dom'

import pageWithData from 'app/hoc/page-with-data'
import withDefault from 'app/hoc/with-default'

const NotesPage = ({ notes }: { notes: Object[] }) => (
  <ul>
    {notes.map(n => (
      <li key={n.id}>
        <Link to={notePath(n.id)}>{n.title}</Link>
      </li>
    ))}
  </ul>
)

const NoNotes = () => <h2>You don't have any note yet, create one!</h2>

export default compose(
  pageWithData,
  withDefault('notes', NoNotes),
)(NotesPage)
