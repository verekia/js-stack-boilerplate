// @flow

import fetch from 'isomorphic-fetch'

export const fetchGraphQL = async (query: string, variables?: Object) => {
  let resp
  try {
    resp = await (await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })).json()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return null
  }
  if (resp.errors) {
    // eslint-disable-next-line no-console
    console.error(resp.errors)
    throw Error(resp.errors[0])
  } else {
    return resp.data
  }
}
