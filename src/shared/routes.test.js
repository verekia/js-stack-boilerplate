/* eslint-disable no-undef */

import { asyncHelloRoute } from './routes'

test('asyncHello', () => {
  expect(asyncHelloRoute()).toBe('/async/hello/:num')
  expect(asyncHelloRoute(123)).toBe('/async/hello/123')
})
