// @flow

import {
  WEBPACK_ENTRY,
  WEBPACK_OUTPUT_PROD,
  webpackBabelRule,
  webpackResolveExtensions,
} from './webpack-config'

export default {
  entry: WEBPACK_ENTRY,
  output: { filename: WEBPACK_OUTPUT_PROD },
  module: {
    rules: [webpackBabelRule],
  },
  resolve: {
    extensions: webpackResolveExtensions,
  },
}
