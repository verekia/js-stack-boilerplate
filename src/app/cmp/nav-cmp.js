// @flow

import React from 'react'

import { Link } from 'react-router-dom'

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dogs">Dogs</Link>
      </li>
      <li>
        <Link to="/dog/123">Dog 1</Link>
      </li>
    </ul>
  </nav>
)

export default Nav
