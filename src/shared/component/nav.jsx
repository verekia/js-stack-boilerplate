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
        <li className="nav-item">
          <NavLink to={HOME_PAGE_ROUTE} className="js-nav-link nav-link" activeStyle={navLinkActiveStyle} exact>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={HELLO_PAGE_ROUTE} className="js-nav-link nav-link" activeStyle={navLinkActiveStyle}>Say Hello</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={HELLO_ASYNC_PAGE_ROUTE} className="js-nav-link nav-link" activeStyle={navLinkActiveStyle}>Say Hello Asynchronously</NavLink>
        </li>
        <li className="nav-item">
          <Link to="/404" className="js-nav-link nav-link">404</Link>
        </li>
      </ul>
    </div>
  </nav>

export default Nav
