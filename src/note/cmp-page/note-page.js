// @flow

import React from 'react'
import { connect } from 'react-redux'

const mstp = ({ page }) => ({ note: page.note })

const NotePage = ({ note }: { note?: Object }) =>
  note ? (
    <div>
      <h1>Note: {note.title}</h1>
      <p>{note.description}</p>
    </div>
  ) : (
    <h1>Could not find that note</h1>
  )

export default connect(mstp)(NotePage)
