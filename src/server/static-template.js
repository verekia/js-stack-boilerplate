// @flow

import Helmet from 'react-helmet'

import { STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/util'
import styles from '../shared/styles'

export default (appHtml: string, preloadedState: Object) => {
  const head = Helmet.rewind()
  return `
  <!doctype html>
  <html>
    <head>
      ${head.title}
      ${head.meta}
      <link rel="stylesheet" href="${STATIC_PATH}/css/bootstrap.min.css">
      <style>${styles.toString()}</style>
    </head>
    <body>
      <div class="js-app">${appHtml}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
      </script>
      <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
    </body>
  </html>
  `
}
