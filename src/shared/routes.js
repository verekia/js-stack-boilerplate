// @flow

export default {
  asyncHello: (num: ?number) => `/async/hello/${num || ':num'}`,
}
