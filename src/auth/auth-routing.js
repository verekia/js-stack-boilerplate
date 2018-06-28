// @flow

import bcrypt from 'bcrypt'

import { notesPageConfig } from 'note/note-config'
import { createUser, findUserByUsername } from 'user/user-db'
import renderPage from '_server/render-page'

const authRouting = (router: Object) => {
  router.post('/signup', async ctx => {
    const { username, password } = ctx.request.body
    if (!username || username === '' || !password || password === '') {
      renderPage(ctx, {
        prefill: ctx.request.body,
        errorMessage: 'Please enter a username and a password.',
      })
    } else {
      const passwordHash = await bcrypt.hash(password, 12)
      await createUser({ username, passwordHash })
      ctx.redirect(notesPageConfig.route.path)
    }
  })

  router.post('/login', async ctx => {
    const { username, password } = ctx.request.body
    const user = await findUserByUsername(username)
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      ctx.session.user = user
      ctx.redirect(notesPageConfig.route.path)
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
