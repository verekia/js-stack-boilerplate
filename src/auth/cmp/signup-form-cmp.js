// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import { loginPageConfig } from 'auth/auth-config'

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
    or <Link to={loginPageConfig.route.path}>Log In</Link>
  </form>
)
