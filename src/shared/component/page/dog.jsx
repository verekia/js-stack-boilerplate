import React from 'react'
import DocumentTitle from 'react-document-title'

import Message from '../../container/message'
import BarkButton from '../../container/bark-button'
import { fullTitle } from '../../util'

const title = 'Dog'

const DogPage = () =>
  <div>
    <DocumentTitle title={fullTitle(title)}>
      <h1>{title}</h1>
    </DocumentTitle>
    <Message />
    <BarkButton />
  </div>

export default DogPage
