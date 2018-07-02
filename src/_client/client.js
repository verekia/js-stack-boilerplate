// @flow

import 'babel-polyfill'

import React from 'react'
import { hydrate } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import reducer from '_client/duck'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from 'app/theme'

/*
import setUpSocket from '_client/socket-client'

setUpSocket(store)
*/

/* eslint-disable no-underscore-dangle */

const composeEnhancers =
  (process.env.NODE_ENV === 'production' ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const store = createStore(
  reducer,
  window.__PRELOADED_STATE__,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

const renderApp = () => {
  // eslint-disable-next-line global-require
  const App = require('../app/app').default
  hydrate(
    <MuiThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </MuiThemeProvider>,
    // flow-disable-next-line
    document.getElementById('app'),
  )
}

renderApp()

const jssStyles = document.getElementById('jss-server-side')
if (jssStyles && jssStyles.parentNode) {
  jssStyles.parentNode.removeChild(jssStyles)
}

// flow-disable-next-line
if (module.hot) {
  module.hot.accept(renderApp)
}
