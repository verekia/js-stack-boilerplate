// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import { welcomePath } from 'welcome/welcome-paths'

export default () => (
  <form action="/login" method="post">
    <label>
      Username
      <input name="username" />
    </label>
    <label>
      Password
      <input name="password" type="password" />
    </label>
    <button>Log In</button>
    or <Link to={welcomePath()}>Sign Up</Link>
  </form>
)
