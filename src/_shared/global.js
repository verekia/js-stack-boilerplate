// @flow

const global = {}

export const setGlobal = (key: string, val: any) => {
  global[key] = val
}

export const getGlobal = (key: string) => global[key]
