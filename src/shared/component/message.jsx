// @flow

import React, { PropTypes } from 'react'

type Props = {
  message: string,
}

const Message = ({ message }: Props) =>
  <p>{message}</p>

Message.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Message
