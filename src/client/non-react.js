// @flow

import $ from 'jquery'
import Tether from 'tether'

import { APP_CONTAINER_SELECTOR } from '../shared/config'

window.jQuery = $
window.Tether = Tether
require('bootstrap')

$(APP_CONTAINER_SELECTOR).on('click', '.js-nav-link', () => {
  $('body').scrollTop(0)
  $('.js-navbar-collapse').collapse('hide')
})
