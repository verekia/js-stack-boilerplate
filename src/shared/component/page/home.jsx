import React from 'react'
import DocumentTitle from 'react-document-title'

import { SITE_NAME } from '../../config'

const HomePage = () =>
  <div>
    <DocumentTitle title={SITE_NAME}>
      <h1>{SITE_NAME}</h1>
    </DocumentTitle>
  </div>

export default HomePage
