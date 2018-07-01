// @flow

import React from 'react'
import { connect } from 'react-redux'

const mstp = ({ page }) => ({ notes: page.notes })

const NotesPage = ({ notes }: { notes: Object[] }) =>
  notes.length ? <ul>{notes.map(n => <li key={n.id}>{n.title}</li>)}</ul> : <div>No notes</div>

export default connect(mstp)(NotesPage)
