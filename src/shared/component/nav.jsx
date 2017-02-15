import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () =>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/hello">Hello Page</Link></li>
    <li><Link to="/hello-async">Async Hello Page</Link></li>
  </ul>

export default Nav
