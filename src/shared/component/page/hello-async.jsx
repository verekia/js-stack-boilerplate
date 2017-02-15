import React from 'react'
import DocumentTitle from 'react-document-title'

import MessageAsync from '../../container/message-async'
import HelloAsyncButton from '../../container/hello-async-button'
import { fullTitle } from '../../util'

const title = 'Async Hello Page'

const HelloAsyncPage = () =>
  <div>
    <DocumentTitle title={fullTitle(title)}>
      <h1>{title}</h1>
    </DocumentTitle>
    <MessageAsync />
    <HelloAsyncButton />
  </div>

export default HelloAsyncPage
