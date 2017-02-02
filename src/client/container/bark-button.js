// @flow

import { connect } from 'react-redux'
import Button from '../component/button'
import { makeBark } from '../action/dog'

const mapDispatchToProps = dispatch => ({
  action: () => { dispatch(makeBark()) },
  actionLabel: 'Bark',
})

export default connect(null, mapDispatchToProps)(Button)
