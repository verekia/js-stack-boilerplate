// @flow

import DocumentTitle from 'react-document-title'

import { isProd, STATIC_PATH, WDS_PORT } from '../../shared/config'

export default (appHtml: string, preloadedState: Object) => `
<!doctype html>
<html>
  <head>
    <title>${DocumentTitle.rewind()}</title>
    <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
  </head>
  <body>
    <div class="app">${appHtml}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
    </script>
    <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
  </body>
</html>
`
