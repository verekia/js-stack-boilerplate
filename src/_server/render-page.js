// @flow

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'
import Helmet from 'react-helmet'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles'
import { StaticRouter } from 'react-router-dom'
import serialize from 'serialize-javascript'
import CleanCSS from 'clean-css'

import theme from 'app/theme'
import getGeneralData from '_server/general-data'
import App from 'app/app'

const renderPage = (ctx: Object, pageData?: Object = {}) => {
  const sheetsRegistry = new SheetsRegistry()
  const generateClassName = createGenerateClassName()
  const store = createStore(() => ({ page: pageData, general: getGeneralData(ctx) }))
  const appHtml = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <ReduxProvider store={store}>
          <StaticRouter location={ctx.req.url} context={{}}>
            <App />
          </StaticRouter>
        </ReduxProvider>
      </MuiThemeProvider>
    </JssProvider>,
  )
  const css = sheetsRegistry.toString()
  const helmet = Helmet.renderStatic()

  ctx.body = `<!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <style id="jss-server-side">${new CleanCSS().minify(css).styles}</style>
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="app">${appHtml}</div>
        <script>window.__PRELOADED_STATE__ = ${serialize(store.getState())}</script>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>`
}

export default renderPage
