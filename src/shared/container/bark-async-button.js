// @flow

import { connect } from 'react-redux'

import { barkAsync } from '../action/dog'
import Button from '../component/button'

const mapStateToProps = () => ({
  label: 'Send 1234 to server',
})

const mapDispatchToProps = dispatch => ({
  handleClick: () => { dispatch(barkAsync(1234)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)
