// @flow

import $ from 'jquery'
import Tether from 'tether'

window.jQuery = $
window.Tether = Tether
require('bootstrap')

$('.js-app').on('click', '.js-nav-link', () => {
  $('.js-navbar-collapse').collapse('hide')
})
