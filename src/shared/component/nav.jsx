import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { APP_NAME } from '../config'
import { HOME_PAGE_ROUTE, HELLO_PAGE_ROUTE, HELLO_ASYNC_PAGE_ROUTE } from '../routes'

const navLinkActiveStyle = { color: 'white' }

const Nav = () =>
  <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <Link to={HOME_PAGE_ROUTE} className="navbar-brand">{APP_NAME}</Link>
    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink to={HOME_PAGE_ROUTE} className="nav-link" activeStyle={navLinkActiveStyle} exact>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={HELLO_PAGE_ROUTE} className="nav-link" activeStyle={navLinkActiveStyle}>Say Hello</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={HELLO_ASYNC_PAGE_ROUTE} className="nav-link" activeStyle={navLinkActiveStyle}>Say Hello Asynchronously</NavLink>
        </li>
      </ul>
    </div>
  </nav>

export default Nav
