// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const styles = { navLink: { textDecoration: 'none' } }

type Props = {
  classes: { navLink: string },
  route?: { path: string },
  htmlHref?: string,
  title: string,
  Icon: Function,
}

const NavItemContent = ({ title: label, Icon }) => (
  <ListItem button>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
)

const NavItem = ({ classes, htmlHref, route, ...rest }: Props) =>
  route ? (
    <Link to={route.path} className={classes.navLink}>
      <NavItemContent {...rest} />
    </Link>
  ) : (
    <a href={htmlHref} className={classes.navLink}>
      <NavItemContent {...rest} />
    </a>
  )

export default withStyles(styles)(NavItem)
