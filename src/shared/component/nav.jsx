// @flow

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { APP_NAME } from '../config'
import { HOME_PAGE_ROUTE, HELLO_PAGE_ROUTE, HELLO_ASYNC_PAGE_ROUTE } from '../routes'

const navLinkActiveStyle = { color: 'white' }

const Nav = () =>
  <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
    <button className="navbar-toggler navbar-toggler-right" type="button" role="button" data-toggle="collapse" data-target=".js-navbar-collapse">
      <span className="navbar-toggler-icon" />
    </button>
    <Link to={HOME_PAGE_ROUTE} className="navbar-brand">{APP_NAME}</Link>
    <div className="js-navbar-collapse collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        {
          [
            { route: HOME_PAGE_ROUTE, label: 'Home' },
            { route: HELLO_PAGE_ROUTE, label: 'Say Hello' },
            { route: HELLO_ASYNC_PAGE_ROUTE, label: 'Say Hello Asynchronously' },
            { route: '/404', label: '404' },
          ].map(link => (
            <li className="nav-item" key={link.route}>
              <NavLink to={link.route} className="js-nav-link nav-link" activeStyle={navLinkActiveStyle} exact>{link.label}</NavLink>
            </li>
          ))
        }
      </ul>
    </div>
  </nav>

export default Nav
