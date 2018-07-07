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

import { allPageConfigs } from '_shared/shared-config'
import NavItem from 'app/cmp/nav-item-cmp'

const mstp = ({ general, page }) => ({ username: general.user.username, title: page.title })

const styles = theme => ({
  appBarPusher: theme.mixins.toolbar,
  navLink: { textDecoration: 'none' },
})

type NavProps = {
  classes: Object,
  pageConfig: Object,
  username: string,
  isOpen: boolean,
  updateIsOpen: Function,
}

const Nav = ({ classes, pageConfig, username, isOpen, updateIsOpen }: NavProps) => (
  <Fragment>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton color="inherit" onClick={() => updateIsOpen(!isOpen)}>
          <MenuIcon />
          {pageConfig.title}
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
        {allPageConfigs
          .filter(pc => pc.inNav)
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
