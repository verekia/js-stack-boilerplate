/* eslint-disable no-undef */

import routes from './routes'

test('asyncHello', () => {
  expect(routes.asyncHello()).toBe('/async/hello/:num')
  expect(routes.asyncHello(123)).toBe('/async/hello/123')
})
