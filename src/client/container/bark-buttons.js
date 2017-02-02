// @flow

import { connect } from 'react-redux'
import BarkButtons from '../component/bark-buttons'
import { bark } from '../action/dog'

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
