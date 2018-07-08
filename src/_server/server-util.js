// @flow

export const protect = (fn: Function) => (vars: Object, ctx: Object) => {
  if (!ctx.session.user) {
    throw Error('unauthorized')
  }
  return fn(ctx.session.user.id, vars)
}
