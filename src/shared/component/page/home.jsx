import React from 'react'
import Helmet from 'react-helmet'

import ModalExample from '../modal-example'
import { APP_NAME } from '../../config'

import { classes } from '../../styles'

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
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-4 mb-4">
          <h2 className="mb-3">Modal</h2>
          <p>
            <button type="button" role="button" className="js-open-modal-example btn btn-primary">Open Modal</button>
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <h2 className="mb-3">Hover</h2>
          <p className={classes.hoverMe}>Hover me</p>
        </div>
        <div className="col-md-4 mb-4">
          <h2 className="mb-3">Media Query</h2>
          <p className={classes.resizeMe}>Resize the window</p>
        </div>
      </div>
    </div>
    <ModalExample />
  </div>

export default HomePage
