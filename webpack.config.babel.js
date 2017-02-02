import { WDS_PORT } from './src/shared/config'

export default {
  entry: './src/client/entry.jsx',
  output: { filename: 'dist/js/bundle.js' },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: { port: WDS_PORT },
}
