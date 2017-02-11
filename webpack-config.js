// @flow

export const WEBPACK_ENTRY = './src/client/entry.jsx'
export const WEBPACK_OUTPUT_DEV = 'js/bundle.js'
export const WEBPACK_OUTPUT_PROD = 'dist/js/bundle.js'

export const webpackBabelRule = {
  test: /\.(js|jsx)$/,
  use: 'babel-loader',
  exclude: /node_modules/,
}

export const webpackResolveExtensions = ['.js', '.jsx']
