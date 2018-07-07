// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import { LOGIN_PATH } from 'auth/auth-paths'

export default () => (
  <form action="/signup" method="post">
    <label>
      Username
      <input name="username" />
    </label>
    <label>
      Password
      <input name="password" type="password" />
    </label>
    <button>Sign Up</button>
    or <Link to={LOGIN_PATH}>Log In</Link>
  </form>
)
