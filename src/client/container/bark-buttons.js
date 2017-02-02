// @flow

import { connect } from 'react-redux'

import { bark, barkAsync } from '../action/dog'
import BarkButtons from '../component/bark-buttons'

const mapDispatchToProps = dispatch => ({
  bark: () => { dispatch(bark('Wah wah!')) },
  barkAsync: () => { dispatch(barkAsync()) },
})

export default connect(null, mapDispatchToProps)(BarkButtons)
