import React from 'react'
import DocumentTitle from 'react-document-title'

import Message from '../../container/message'
import HelloButton from '../../container/hello-button'
import { fullTitle } from '../../util'

const title = 'Hello Page'

const HelloPage = () =>
  <div>
    <DocumentTitle title={fullTitle(title)}>
      <h1>{title}</h1>
    </DocumentTitle>
    <Message />
    <HelloButton />
  </div>

export default HelloPage
