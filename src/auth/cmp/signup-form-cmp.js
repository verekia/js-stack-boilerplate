// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import { loginPath } from 'auth/auth-paths'

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
    or <Link to={loginPath()}>Log In</Link>
  </form>
)
