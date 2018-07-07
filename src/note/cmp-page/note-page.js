// @flow

import React from 'react'

import isPage from 'app/hoc/is-page'

const NotePage = ({ title, description }: { title: string, description?: string }) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
)

const NoNote = () => <h2>Opps, couldn't find this note</h2>

export default isPage({ DefaultCmp: NoNote })(NotePage)
