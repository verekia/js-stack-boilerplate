// @flow

import React from 'react'
import { notePath } from 'note/note-paths'
import { notesGraphql } from 'note/note-graphql'
import { Link } from 'react-router-dom'

import isPage from 'app/hoc/is-page'

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

export default isPage({
  mainDataProp: 'notes',
  graphql: notesGraphql,
  DefaultCmp: NoNotes,
})(NotesPage)
