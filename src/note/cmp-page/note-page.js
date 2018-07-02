// @flow

import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle as withLifecycle } from 'recompose'
import { notePageConfig } from 'note/note-config'

import { loadPage } from '_client/duck'

const mstp = ({ page }) => ({ note: page.note })
const mdtp = dispatch => ({
  fetchPage: id => dispatch(loadPage(notePageConfig.graphql.query, { id })),
})

const lifecycle = {
  componentDidMount() {
    if (!this.props.note) {
      this.props.fetchPage(this.props.match.params.id)
    }
  },
}

const NotePage = ({ note }: { note?: Object }) =>
  note ? (
    <div>
      <h1>Note: {note.title}</h1>
      <p>{note.description}</p>
    </div>
  ) : null

export default compose(
  connect(
    mstp,
    mdtp,
  ),
  withLifecycle(lifecycle),
)(NotePage)
