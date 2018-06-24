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

import { fetchDogs, fetchDog } from '_shared/api-calls'

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
    apiCall: fetchDogs,
  },
  {
    path: '/dog/:id',
    component: DogPage,
    apiCall: (url: string) => fetchDog(url.split('/').pop()),
  },
]

export default routes
