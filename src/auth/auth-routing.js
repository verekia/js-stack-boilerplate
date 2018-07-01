// @flow

import uuid from 'uuid/v4'
import bcrypt from 'bcrypt'

import { notesPageConfig } from 'note/note-config'
import { createUser, findUserByUsername } from 'user/user-db'
import renderPage from '_server/render-page'

const logIn = (ctx, id, username) => {
  ctx.session.user = { id, username }
  ctx.redirect(notesPageConfig.route.path)
}

const authRouting = (router: Object) => {
  router.post('/signup', async ctx => {
    const { username, password } = ctx.request.body
    ctx.session = {}
    if (!username || username === '' || !password || password === '') {
      renderPage(ctx, {
        prefill: ctx.request.body,
        errorMessage: 'Please enter a username and a password.',
      })
    } else {
      const passwordHash = await bcrypt.hash(password, 12)
      const id = uuid()
      await createUser({ id, username, passwordHash })
      logIn(ctx, id, username)
    }
  })

  router.post('/login', async ctx => {
    const { username, password } = ctx.request.body
    ctx.session = {}
    const user = await findUserByUsername(username)
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      logIn(ctx, user.id, user.username)
    } else {
      renderPage(ctx, {
        prefill: ctx.request.body,
        errorMessage: 'Incorrect username or password.',
      })
    }
  })

  router.get('/logout', ctx => {
    ctx.session = null
    ctx.redirect('/')
  })
}

export default authRouting
