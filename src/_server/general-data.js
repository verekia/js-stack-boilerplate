// @flow

const getGeneralData = (ctx: Object) => {
  const { user } = ctx.session
  return { username: user && user.username }
}

export default getGeneralData
