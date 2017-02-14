import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'

import App from './../shared/app'

export default (location: string, store: Object) =>
  ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={{}}>
        <App />
      </StaticRouter>
    </Provider>)
