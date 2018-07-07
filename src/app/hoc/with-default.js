// @flow

import React from 'react'
import { connect } from 'react-redux'

const mstp = ({ general }) => ({ isLoading: general.isLoading })

const hasDefault = (mainDataPropName: string, DefaultCmp: Function) => (BaseCmp: Function) => {
  const CmpWithDefault = props => {
    const mainData = props[mainDataPropName]
    const isArray = Array.isArray(mainData)
    const hasData = isArray ? mainData.length > 0 : !!mainData
    const onlyDataProps = isArray ? { [mainDataPropName]: mainData } : { ...mainData }

    if (hasData) {
      return <BaseCmp {...onlyDataProps} />
    }
    if (!hasData && props.isLoading) {
      return null
    }
    return DefaultCmp ? <DefaultCmp /> : null
  }

  return connect(mstp)(CmpWithDefault)
}

export default hasDefault
