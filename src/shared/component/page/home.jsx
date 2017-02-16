import React from 'react'
import Helmet from 'react-helmet'

import ModalExample from '../modal-example'
import { APP_NAME } from '../../config'

const HomePage = () =>
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'Hello App is an app to say hello' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <div className="jumbotron">
      <div className="container">
        <h1 className="display-3 mb-4">{APP_NAME}</h1>
        <button type="button" role="button" className="js-open-modal-example btn btn-primary">Open Modal</button>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h2>Column</h2>
          <p>Some text.</p>
        </div>
        <div className="col-md-4">
          <h2>Column</h2>
          <p>Some text.</p>
        </div>
        <div className="col-md-4">
          <h2>Column</h2>
          <p>Some text.</p>
        </div>
      </div>
    </div>
    <ModalExample />
  </div>

export default HomePage
