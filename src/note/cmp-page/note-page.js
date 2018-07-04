// @flow

import React from 'react'

import { noteGraphql } from 'note/note-graphql'
import isPage from 'app/hoc/is-page'

const NotePage = ({ title, description }: { title: string, description?: string }) => (
  <div>
    <h1>Note: {title}</h1>
    <p>{description}</p>
  </div>
)

const NoNote = () => <h2>Opps, couldn't find this note</h2>

export default isPage({
  mainDataProp: 'note',
  graphqlQuery: noteGraphql.query,
  DefaultCmp: NoNote,
})(NotePage)
