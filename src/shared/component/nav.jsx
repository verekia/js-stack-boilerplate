import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () =>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/dog">Dog</Link></li>
    <li><Link to="/dog-async">Dog Async</Link></li>
  </ul>

export default Nav
