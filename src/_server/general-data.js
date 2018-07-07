// @flow

const getGeneralData = (ctx: Object) => {
  const generalData: Object = { isSsr: true }
  if (ctx.session && ctx.session.user) {
    generalData.user = ctx.session.user
  }
  return generalData
}

export default getGeneralData
