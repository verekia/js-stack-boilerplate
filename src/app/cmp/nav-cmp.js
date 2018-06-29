// @flow

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import AppBar from '@material-ui/core/AppBar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'

import { allPageConfigs } from '_shared/shared-config'

import { Link } from 'react-router-dom'

const navConfigs = allPageConfigs.filter(c => c.showInNav)

const styles = {
  navLink: { textDecoration: 'none' },
}

const mstp = ({ general }) => ({ username: general.user.username })

type Props = {
  classes: Object,
  username: string,
  isOpen: boolean,
  updateIsOpen: Function,
}

const Nav = ({ classes, username, isOpen, updateIsOpen }: Props) => (
  <Fragment>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton color="inherit" onClick={() => updateIsOpen(!isOpen)}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      disableBackdropTransition={true}
      onOpen={() => updateIsOpen(true)}
      onClose={() => updateIsOpen(false)}
      onClick={() => updateIsOpen(false)}
    >
      <List>
        {navConfigs.map(({ icon: Icon, route, title }) => (
          <Link key={route.path} to={route.path} className={classes.navLink}>
            <ListItem button>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
        <a href="/logout" className={classes.navLink}>
          <ListItem button>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </a>
      </List>
    </SwipeableDrawer>
  </Fragment>
)

export default compose(
  connect(mstp),
  withStyles(styles),
  withState('isOpen', 'updateIsOpen', false),
)(Nav)
