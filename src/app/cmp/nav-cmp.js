// @flow

import React from 'react'
import LogoutIcon from '@material-ui/icons/ExitToApp'

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
        <a href="/logout">
          <LogoutIcon />Log Out
        </a>
      </li>
    </ul>
  </nav>
)

export default Nav
