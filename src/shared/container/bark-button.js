// @flow

import { connect } from 'react-redux'

import { bark } from '../action/dog'
import Button from '../component/button'

const mapStateToProps = () => ({
  label: 'Bark',
})

const mapDispatchToProps = dispatch => ({
  handleClick: () => { dispatch(bark('Wah wah!')) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)
