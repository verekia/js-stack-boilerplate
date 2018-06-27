// @flow

// export const HOME_PAGE_ROUTE = '/'
// export const HELLO_PAGE_ROUTE = '/hello'
// export const HELLO_ASYNC_PAGE_ROUTE = '/hello-async'
// export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404'

// export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`

import HomePage from 'home/cmp-page/home-page'
import LoginPage from 'user/cmp-page/login-page'
import SignupPage from 'user/cmp-page/signup-page'
import DogsPage from 'dog/cmp-page/dogs-page'
import DogPage from 'dog/cmp-page/dog-page'

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/signup',
    exact: true,
    component: SignupPage,
  },
  {
    path: '/dogs',
    component: DogsPage,
    query: '{ dogs { id, name } }',
  },
  {
    path: '/dog/:id',
    component: DogPage,
    query: 'query ($id: ID!) { dog(id: $id) { id, name } }',
    getVariables: ({ id }: { id: string }) => ({ id }), // Mapping URL params => query variables
  },
]

export default routes
