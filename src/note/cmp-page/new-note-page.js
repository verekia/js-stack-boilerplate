// @flow

import React from 'react'

const NewNotePage = () => (
  <form method="post">
    <input name="title" required />
    <textarea name="description" />
    <button type="submit">Submit</button>
  </form>
)

export default NewNotePage
