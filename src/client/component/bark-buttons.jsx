// @flow

import React, { PropTypes } from 'react'

const BarkButtons = ({ bark, barkAsync }: { bark: Function, barkAsync: Function }) =>
  <div>
    <button onClick={bark}>Bark</button>
    <button onClick={barkAsync}>Bark Async</button>
  </div>

BarkButtons.propTypes = {
  bark: PropTypes.func.isRequired,
  barkAsync: PropTypes.func.isRequired,
}

export default BarkButtons
