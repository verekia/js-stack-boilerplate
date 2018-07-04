// @flow

import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { loadPage } from 'app/duck'

const isPage = ({
  mainDataProp,
  graphqlQuery,
  DefaultCmp,
}: {
  mainDataProp: string,
  graphqlQuery: string,
  DefaultCmp: Function,
}) => (BaseComponent: Function) => {
  const mstp = ({ page }) => ({ [mainDataProp]: page[mainDataProp] })
  const mdtp = dispatch => ({
    fetchPage: params => dispatch(loadPage(graphqlQuery, params)),
  })

  const EnhancedComponent = props => {
    const mainData = props[mainDataProp]
    const hasData = Array.isArray(mainData) ? mainData.length > 0 : !!mainData
    const onlyDataProps = Array.isArray(mainData)
      ? { [mainDataProp]: mainData }
      : { ...props[mainDataProp] }
    if (hasData) {
      return <BaseComponent {...onlyDataProps} />
    }
    return DefaultCmp ? <DefaultCmp {...onlyDataProps} /> : null
  }

  return compose(
    connect(
      mstp,
      mdtp,
    ),
    lifecycle({
      componentDidMount() {
        if (!this.props[mainDataProp]) {
          this.props.fetchPage(this.props.match.params)
        }
      },
    }),
  )(EnhancedComponent)
}

export default isPage
