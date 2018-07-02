// @flow

import fetch from 'isomorphic-fetch'

type OptionsType = {
  baseUrl?: string,
  query: string,
  variables?: Object,
  cookie?: string,
}

export const fetchGraphQL = async ({ baseUrl, query, variables, cookie }: OptionsType) => {
  let resp
  try {
    resp = await (await fetch(`${baseUrl || ''}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', cookie },
      body: JSON.stringify({ query, variables }),
      credentials: 'same-origin',
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
