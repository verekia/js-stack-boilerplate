// @flow

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { loadPageAsync } from '_client/duck'

const mstp = ({ general, page }) => ({ isSsr: general.isSsr, ...page })

const pageWithData = (BaseComponent: Function) =>
  compose(
    connect(mstp),
    lifecycle({
      componentDidMount() {
        const { dispatch, match, graphql, isSsr } = this.props
        if (graphql && !isSsr) {
          dispatch(
            loadPageAsync(
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
