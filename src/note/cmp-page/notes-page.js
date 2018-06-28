// @flow

import React from 'react'
import { connect } from 'react-redux'

const mstp = ({ page }) => ({ notes: page.notes })

const NotesPage = ({ notes }: { notes: Object[] }) => (
  <ul>{notes.map(n => <li key={n.id}>{n.title}</li>)}</ul>
)

export default connect(mstp)(NotesPage)
