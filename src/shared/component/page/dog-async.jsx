import React, { PropTypes } from 'react'
import DocumentTitle from 'react-document-title'

import Message from '../../container/message'
import BarkAsyncButton from '../../container/bark-async-button'

const DogAsyncPage = ({ title }: { title: string }) =>
  <div>
    <DocumentTitle title={title}>
      <h1>{title}</h1>
    </DocumentTitle>
    <Message />
    <BarkAsyncButton />
  </div>

DogAsyncPage.propTypes = {
  title: PropTypes.string.isRequired,
}

export default DogAsyncPage
