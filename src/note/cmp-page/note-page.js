// @flow

import React from 'react'
import { compose } from 'recompose'

import pageWithData from 'app/hoc/page-with-data'
import withDefault from 'app/hoc/with-default'

const NotePage = ({ title, description }: { title: string, description?: string }) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
)

const NoNote = () => <h2>Opps, couldn't find this note</h2>

export default compose(
  pageWithData,
  withDefault('note', NoNote),
)(NotePage)
