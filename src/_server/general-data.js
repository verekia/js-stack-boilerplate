// @flow

const getGeneralData = (ctx: Object) => {
  // Remove this check when we have sessions
  if (ctx.session) {
    const { user } = ctx.session
    return { username: user && user.username }
  }
  return {}
}

export default getGeneralData
