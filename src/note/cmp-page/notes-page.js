// @flow

import React from 'react'
import { notePath } from 'note/note-paths'
import { notesGraphql } from 'note/note-graphql'
import { Link } from 'react-router-dom'

import isPage from 'app/hoc/is-page'

const NotesPage = ({ notes }: { notes?: Object[] }) => (
  <div>
    {notes && (
      <div>
        {notes.length > 0 ? (
          <ul>
            {notes.map(n => (
              <li key={n.id}>
                <Link to={notePath(n.id)}>{n.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>No notes</div>
        )}
      </div>
    )}
  </div>
)

const NoNotes = () => <h2>You don't have any note yet, create one!</h2>

export default isPage({
  mainDataProp: 'notes',
  graphqlQuery: notesGraphql.query,
  DefaultCmp: NoNotes,
})(NotesPage)
