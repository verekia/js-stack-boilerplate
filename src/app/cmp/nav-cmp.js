// @flow

import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { compose, withState } from 'recompose'
import AppBar from '@material-ui/core/AppBar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'

import { allRoutes } from '_shared/routes'
import NavItem from 'app/cmp/nav-item-cmp'

const styles = theme => ({
  appBarPusher: theme.mixins.toolbar,
  navLink: { textDecoration: 'none' },
})

const mstp = ({ general }) => ({ username: general.user.username })

type NavProps = {
  classes: Object,
  title?: string,
  username: string,
  isOpen: boolean,
  updateIsOpen: Function,
}

const Nav = ({ classes, title, username, isOpen, updateIsOpen }: NavProps) => (
  <Fragment>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton color="inherit" onClick={() => updateIsOpen(!isOpen)}>
          <MenuIcon />
          {title}
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
        {allRoutes
          .filter(r => r.inNav)
          .map(props => (
            <NavItem key={props.route ? props.route.path : props.htmlHref} {...props} />
          ))}
      </List>
    </SwipeableDrawer>
  </Fragment>
)

export default compose(
  connect(mstp),
  withStyles(styles),
  withState('isOpen', 'updateIsOpen', false),
)(Nav)
