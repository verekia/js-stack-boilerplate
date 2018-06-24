// @flow

import React from 'react'
import { connect } from 'react-redux'

const mstp = ({ page }) => ({ dogs: page.dogs })

const DogsPage = ({ dogs }: { dogs: Object[] }) => (
  <ul>{dogs.map(d => <li key={d.id}>{d.name}</li>)}</ul>
)

export default connect(mstp)(DogsPage)
