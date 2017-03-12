// @flow

import React, { PropTypes } from 'react'

type Props = {
  label: string,
  handleClick: Function,
}

const Button = ({ label, handleClick }: Props) =>
  <button
    onClick={handleClick}
    className="btn btn-primary"
    type="button"
    role="button"
  >{label}</button>

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Button
