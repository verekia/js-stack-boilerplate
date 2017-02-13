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
    </Provider>,
// Temporary fix until react-router/pull/4484 is released
).replace(/<a href="\/\//g, '<a href="/')
