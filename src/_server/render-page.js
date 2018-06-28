// @flow

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Helmet from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import serialize from 'serialize-javascript'

import getGeneralData from '_server/general-data'
import App from 'app/app'

const renderPage = (ctx: Object, pageData?: Object = {}) => {
  const store = createStore(() => ({ page: pageData, general: getGeneralData(ctx) }))
  const appHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.req.url} context={{}}>
        <App />
      </StaticRouter>
    </Provider>,
  )
  const helmet = Helmet.renderStatic()

  ctx.body = `<!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="app">${appHtml}</div>
        <script>window.__PRELOADED_STATE__ = ${serialize(store.getState())}</script>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>`
}

export default renderPage
