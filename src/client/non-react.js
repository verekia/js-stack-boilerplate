// @flow

import $ from 'jquery'
import Tether from 'tether'

window.jQuery = $
window.Tether = Tether
require('bootstrap')

$('.js-app').on('click', '.js-nav-link', () => {
  $('body').scrollTop(0)
  $('.js-navbar-collapse').collapse('hide')
})
