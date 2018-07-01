// @flow

import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { Link } from 'react-router-dom'

const styles = { navLink: { textDecoration: 'none' } }

type Props = {
  classes: Object,
  url: string,
  label: string,
  icon: Function,
}

const NavItem = ({ classes, url, label, icon: Icon }: Props) => (
  <Link to={url} className={classes.navLink}>
    <ListItem button>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  </Link>
)

export default withStyles(styles)(NavItem)
