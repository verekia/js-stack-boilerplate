// @flow

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { loadPage } from '_client/duck'

const mstp = ({ page }) => ({ ...page })

const pageWithData = (BaseComponent: Function) =>
  compose(
    connect(mstp),
    lifecycle({
      componentDidMount() {
        const { dispatch, match, graphql } = this.props
        if (graphql) {
          dispatch(
            loadPage(
              {
                query: graphql.query,
                variables: graphql.mapParams ? graphql.mapParams(match.params) : match.params,
              },
              graphql.mapResp,
            ),
          )
        }
      },
    }),
  )(BaseComponent)

export default pageWithData
