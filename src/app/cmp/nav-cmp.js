// @flow

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose, withState } from 'recompose'
import AppBar from '@material-ui/core/AppBar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import MenuIcon from '@material-ui/icons/Menu'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'

import { allPageConfigsExceptRoot } from '_shared/shared-config'
import { notesPageConfig } from 'note/note-config'
import NavItem from 'app/cmp/nav-item-cmp'
import { logoutPath } from 'auth/auth-paths'

const navConfigs = allPageConfigsExceptRoot.filter(c => c.showInNav)

const mstp = ({ general }) => ({ username: general.user.username })

const styles = theme => ({
  appBarPusher: theme.mixins.toolbar,
  navLink: { textDecoration: 'none' },
})

type NavProps = {
  classes: Object,
  username: string,
  isOpen: boolean,
  updateIsOpen: Function,
}

const Nav = ({ classes, username, isOpen, updateIsOpen }: NavProps) => (
  <Fragment>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton color="inherit" onClick={() => updateIsOpen(!isOpen)}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <div className={classes.appBarPusher} />
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      disableBackdropTransition={true}
      onOpen={() => updateIsOpen(true)}
      onClose={() => updateIsOpen(false)}
      onClick={() => updateIsOpen(false)}
    >
      <List>
        <Link to={notesPageConfig.route.path} className={classes.navLink}>
          <NavItem label={notesPageConfig.title} icon={notesPageConfig.icon} />
        </Link>
        {navConfigs.map(c => (
          <Link key={c.route.path} to={c.route.path} className={classes.navLink}>
            <NavItem label={c.title} icon={c.icon} />
          </Link>
        ))}
        <a href={logoutPath()} className={classes.navLink}>
          <NavItem label="Log Out" icon={LogoutIcon} />
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
