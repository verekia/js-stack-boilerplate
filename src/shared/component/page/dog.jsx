import React, { PropTypes } from 'react'
import DocumentTitle from 'react-document-title'

import Message from '../../container/message'
import BarkButton from '../../container/bark-button'

const DogPage = ({ title }: { title: string }) =>
  <div>
    <DocumentTitle title={title}>
      <h1>{title}</h1>
    </DocumentTitle>
    <Message />
    <BarkButton />
  </div>

DogPage.propTypes = {
  title: PropTypes.string.isRequired,
}

export default DogPage
