// @flow

import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { loadPage } from '_client/duck'
import { allPageConfigsExceptRoot } from '_shared/shared-config'
import { notesPageConfig } from 'note/note-config'

const isPage = ({
  mainDataPropName,
  graphql,
  DefaultCmp,
  createTitle,
}: {
  mainDataPropName?: string,
  graphql?: Object,
  DefaultCmp?: Function,
  createTitle?: Function,
}) => (BaseComponent: Function) => {
  // TODO: mainDataPropName should only be used for DefaultCmp
  const mapStateToProps = ({ general, page }) => {
    const props = {
      isLoading: general.isLoading,
    }
    if (mainDataPropName) {
      props[mainDataPropName] = page[mainDataPropName]
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
    const mainData = props[mainDataPropName]
    const hasData = Array.isArray(mainData) ? mainData.length > 0 : !!mainData
    const onlyDataProps = Array.isArray(mainData)
      ? { [mainDataPropName]: mainData }
      : { ...props[mainDataPropName] }
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
        if (!this.props[mainDataPropName]) {
          this.props.fetchPage(this.props.match.params)
        }
      },
    }),
  )(EnhancedComponent)
}

export default isPage
