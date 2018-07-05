// @flow

import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { loadPage } from 'app/duck'
import { allPageConfigsExceptRoot } from '_shared/shared-config'
import { notesPageConfig } from 'note/note-config'

const isPage = ({
  mainDataProp,
  graphql,
  DefaultCmp,
  createTitle,
}: {
  mainDataProp?: string,
  graphql?: Object,
  DefaultCmp?: Function,
  createTitle?: Function,
}) => (BaseComponent: Function) => {
  const mapStateToProps = ({ general, page }) => {
    const props = {
      isLoading: general.isLoading,
    }
    if (mainDataProp) {
      props[mainDataProp] = page[mainDataProp]
    }
  }
  const mapDispatchToProps = (dispatch, props) => {
    const activeConfig = allPageConfigsExceptRoot
      .concat(notesPageConfig)
      .find(({ route }) => route.path === props.match.path)

    if (!activeConfig) {
      throw Error(`Could not find route for path: ${props.match.path}`)
    }

    return {
      fetchPage: params =>
        dispatch(
          loadPage({
            query: graphql.query,
            variables: graphql.mapParams ? graphql.mapParams(params) : params,
            createTitle: activeConfig.createTitle,
          }),
        ),
    }
  }

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
      mapStateToProps,
      mapDispatchToProps,
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
