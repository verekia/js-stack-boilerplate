// @flow

import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { loadPage } from '_client/duck'
import { getActiveRoute } from '_shared/routes'

const mstp = ({ general, page }) => ({ isLoggedIn: !!general.user, ...page })

const pageWithData = (BaseComponent: Function) =>
  compose(
    connect(mstp),
    lifecycle({
      componentDidMount() {
        const { dispatch, isLoggedIn, match } = this.props
        const { graphql } = getActiveRoute(isLoggedIn, match.path)
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
