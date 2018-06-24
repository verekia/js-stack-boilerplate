// @flow

import React from 'react'
import { connect } from 'react-redux'

const mstp = ({ page }) => ({ ...page.dog })

const DogPage = ({ name }: { name: string }) => <h1>Dog: {name}</h1>

export default connect(mstp)(DogPage)
