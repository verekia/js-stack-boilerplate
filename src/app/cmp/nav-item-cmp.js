// @flow

import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

type Props = {
  label: string,
  icon: Function,
}

const NavItem = ({ label, icon: Icon }: Props) => (
  <ListItem button>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
)

export default NavItem
