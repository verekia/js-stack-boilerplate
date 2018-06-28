// @flow

import React from 'react'
import { connect } from 'react-redux'

const mstp = ({ page }) => ({ ...page.note })

const NotePage = ({ title, description }: { title: string, description?: string }) => (
  <div>
    <h1>Note: {title}</h1>
    <p>{description}</p>
  </div>
)

export default connect(mstp)(NotePage)
