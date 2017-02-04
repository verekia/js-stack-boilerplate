// @flow

import { IS_PROD, WDS_PORT } from '../../shared/config'

export default (title: string) => `
<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="/public/css/style.css">
  </head>
  <body>
    <h1>${title}</h1>
    <div class="js-app"></div>
    <script src="${IS_PROD ? '' : `http://localhost:${WDS_PORT}`}/dist/js/bundle.js"></script>
  </body>
</html>
`
