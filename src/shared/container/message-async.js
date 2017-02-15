// @flow

import { connect } from 'react-redux'

import MessageAsync from '../component/message'

const mapStateToProps = state => ({
  message: state.dog.get('barkMessageAsync'),
})

export default connect(mapStateToProps)(MessageAsync)
