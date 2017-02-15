import React from 'react'
import DocumentTitle from 'react-document-title'

import { APP_NAME } from '../../config'

const HomePage = () =>
  <div>
    <DocumentTitle title={APP_NAME}>
      <h1>{APP_NAME}</h1>
    </DocumentTitle>
  </div>

export default HomePage
