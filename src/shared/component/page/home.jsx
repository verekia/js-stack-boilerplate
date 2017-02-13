import React, { PropTypes } from 'react'
import DocumentTitle from 'react-document-title'

const HomePage = ({ title }: { title: string }) =>
  <div>
    <DocumentTitle title={title}>
      <h1>{title}</h1>
    </DocumentTitle>
    Welcome.
  </div>

HomePage.propTypes = {
  title: PropTypes.string.isRequired,
}

export default HomePage
