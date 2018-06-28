// @flow

import React from 'react'
import { connect } from 'react-redux'
import LogoutIcon from '@material-ui/icons/ExitToApp'

import { allPageConfigs } from '_shared/shared-config'

import { Link } from 'react-router-dom'

const navConfigs = allPageConfigs.filter(c => c.showInNav)

const mstp = ({ general }) => ({ username: general.user.username })

const Nav = ({ username }: { username: string }) => (
  <nav>
    <ul>
      {navConfigs.map(({ title, icon: Icon, route }) => (
        <li key={route}>
          <Link to={route.path}>
            <Icon />
            {title}
          </Link>
        </li>
      ))}
      <li>
        <a href="/logout">
          <LogoutIcon />Log Out ({username})
        </a>
      </li>
    </ul>
  </nav>
)

export default connect(mstp)(Nav)
