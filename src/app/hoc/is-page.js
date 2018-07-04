// @flow

import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { loadPage } from 'app/duck'

const isPage = ({
  mainDataProp,
  graphql,
  DefaultCmp,
}: {
  mainDataProp: string,
  graphql: Object,
  DefaultCmp: Function,
}) => (BaseComponent: Function) => {
  const mstp = ({ general, page }) => ({
    [mainDataProp]: page[mainDataProp],
    isLoading: general.isLoading,
  })
  const mdtp = dispatch => ({
    fetchPage: params =>
      dispatch(loadPage(graphql.query, graphql.mapParams ? graphql.mapParams(params) : params)),
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
    if (!hasData && props.isLoading) {
      return null
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
