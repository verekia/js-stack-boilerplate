// @flow

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { SheetsRegistryProvider } from 'react-jss'

import App from './../shared/app'

export default (location: string, store: Object, sheets: Object) =>
  ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={{}}>
        <SheetsRegistryProvider registry={sheets}>
          <App />
        </SheetsRegistryProvider>
      </StaticRouter>
    </Provider>)
