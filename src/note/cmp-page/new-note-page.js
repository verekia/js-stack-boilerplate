// @flow

import React from 'react'

const handleSubmit = async (e, graphqlPost, history) => {
  e.preventDefault()
  try {
    const resp = await fetch(window.location.href, {
      method: 'POST',
      // flow-disable-next-line
      body: new FormData(document.getElementById('form')),
      credentials: 'same-origin',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    if (graphqlPost.redirect) {
      history.push(graphqlPost.redirect(await resp.json()))
    }
  } catch (err) {
    console.log(err)
  }
}

const NewNotePage = ({ graphqlPost, history }: { graphqlPost: Object, history: Object }) => (
  <form id="form" method="post" onSubmit={e => handleSubmit(e, graphqlPost, history)}>
    <input name="title" required />
    <textarea name="description" />
    <button type="submit">Submit</button>
  </form>
)

export default NewNotePage
