// @flow

import { connect } from 'react-redux'
import BarkMessage from '../component/bark-message'

const mapStateToProps = state => ({
  message: state.dog.get('barkMessage'),
})

export default connect(mapStateToProps)(BarkMessage)
