// @flow

import fetch from 'isomorphic-fetch'

export const fetchGraphQL = async (query: string, variables?: Object, cookie?: string) => {
  let resp
  try {
    resp = await (await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify({ query, variables }),
    })).json()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return null
  }
  if (resp.errors) {
    throw Error(resp.errors[0].message)
  } else {
    return resp.data
  }
}
