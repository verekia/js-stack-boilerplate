// @flow

import {
  WEBPACK_ENTRY,
  WEBPACK_OUTPUT_DEV,
  webpackBabelRule,
  webpackResolveExtensions,
} from './webpack-config'

import { WDS_PORT } from './src/shared/config'

export default {
  entry: WEBPACK_ENTRY,
  output: { filename: WEBPACK_OUTPUT_DEV },
  module: {
    rules: [webpackBabelRule],
  },
  devtool: 'source-map',
  resolve: {
    extensions: webpackResolveExtensions,
  },
  devServer: { port: WDS_PORT },
}
