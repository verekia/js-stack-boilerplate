// @flow

import isInt from 'validator/lib/isInt'
import forOwn from 'lodash/forOwn'

const parseFields = (
  fields: Object,
  { integer: integerParam, toggle: toggleParam }: Object = {},
) => {
  const parsedFields = {}

  let integerFields
  if (typeof integerParam === 'string') {
    integerFields = [integerParam]
  } else if (!integerParam) {
    integerFields = []
  } else {
    integerFields = integerParam
  }

  let toggleFields
  if (typeof toggleParam === 'string') {
    toggleFields = [toggleParam]
  } else if (!toggleParam) {
    toggleFields = []
  } else {
    toggleFields = toggleParam
  }

  forOwn(fields, (value, key) => {
    if (integerFields.find(f => f === key)) {
      if (isInt(value)) {
        parsedFields[key] = Number(value)
      } else {
        throw Error(`Value '${value}' of integer field '${key}' is not an integer.`)
      }
    } else if (toggleFields.find(f => f === key)) {
      if (value === 'on') {
        parsedFields[key] = true
      } else if (value) {
        throw Error(`Value '${value}' of toggle field '${key}' is not 'on'.`)
      }
    } else if (value !== '') {
      parsedFields[key] = value
    }
  })

  return parsedFields
}

export default parseFields
