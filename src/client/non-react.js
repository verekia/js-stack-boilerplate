// @flow

import $ from 'jquery'
import Tether from 'tether'

window.jQuery = $
window.Tether = Tether
require('bootstrap')

$('.js-app').on('click', '.js-open-modal-example', () => {
  $('.js-modal-example').modal('show')
})
