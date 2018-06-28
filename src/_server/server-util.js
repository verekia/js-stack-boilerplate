// @flow

export const protect = (fn: Function) => (vars: Object, ctx: Object, ...rest: any[]) => {
  console.log(ctx.session)
  return fn(vars, ctx, ...rest)
}
