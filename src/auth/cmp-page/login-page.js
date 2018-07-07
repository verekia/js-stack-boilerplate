// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import isPage from 'app/hoc/is-page'
import { WELCOME_PATH } from 'welcome/welcome-paths'

const LoginPage = () => (
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
    or <Link to={WELCOME_PATH}>Sign Up</Link>
  </form>
)

export default isPage(LoginPage)
