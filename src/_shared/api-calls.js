// @flow

import fetch from 'isomorphic-fetch'

export const fetchDogs = async () => {
  let data
  try {
    data = await (await fetch('http://localhost:8000/api/dogs')).json()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return null
  }
  return data
}

export const fetchDog = async (id: string) => {
  let data
  try {
    data = await (await fetch(`http://localhost:8000/api/dog/${id}`)).json()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return null
  }
  return data
}
