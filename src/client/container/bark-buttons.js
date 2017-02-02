// @flow

import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'

import { bark } from '../action/dog'
import BarkButtons from '../component/bark-buttons'

const mapDispatchToProps = dispatch => ({
  bark: () => { dispatch(bark('Wah wah!')) },
  barkAsync: () => {
    fetch('/async/bark', { method: 'GET' })
      .then(res => res.json())
      .then((data) => {
        dispatch(bark(data.message))
      })
  },
})

export default connect(null, mapDispatchToProps)(BarkButtons)
