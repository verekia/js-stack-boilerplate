// @flow

import { WDS_PORT, isProd } from './src/shared/config'

export default {
  entry: './src/client/entry.jsx',
  output: { filename: 'dist/js/bundle.js' },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: { port: WDS_PORT },
}
