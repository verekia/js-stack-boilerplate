// @flow

import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle as withLifecycle } from 'recompose'
import { notesPageConfig, notePageConfig } from 'note/note-config'
import { Link } from 'react-router-dom'

import { loadPage } from '_client/duck'

const mstp = ({ page }) => ({ notes: page.notes })
const mdtp = dispatch => ({ fetchPage: () => dispatch(loadPage(notesPageConfig.graphql.query)) })

const lifecycle = {
  componentDidMount() {
    if (!this.props.notes) {
      this.props.fetchPage()
    }
  },
}

const NotesPage = ({ notes }: { notes?: Object[] }) => (
  <div>
    {notes && (
      <div>
        {notes.length > 0 ? (
          <ul>
            {notes.map(n => (
              <li key={n.id}>
                <Link to={notePageConfig.route.path(n.id)}>{n.title}</Link>
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

export default compose(
  connect(
    mstp,
    mdtp,
  ),
  withLifecycle(lifecycle),
)(NotesPage)
