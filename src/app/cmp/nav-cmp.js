// @flow

import React from 'react'

import { allPageConfigs } from '_shared/shared-config'

import { Link } from 'react-router-dom'

const loggedInPageConfigs = allPageConfigs.filter(c => !c.loggedOutOnly)

const Nav = () => (
  <nav>
    <ul>
      {loggedInPageConfigs.map(({ title, icon: Icon, route }) => (
        <li>
          <Link to={route.path}>
            <Icon />
            {title}
          </Link>
        </li>
      ))}
      <li>
        <Link to="/note/123">Note 123</Link>
      </li>
      <li>
        <Link to="/logout">404</Link>
      </li>
    </ul>
  </nav>
)

export default Nav
