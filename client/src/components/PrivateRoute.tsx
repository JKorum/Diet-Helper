import React, { FunctionComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect, MapStateToProps } from 'react-redux'
import { StoreState } from '../store/reducers'

interface PrivateRouteProps extends ConnectedProps {
  path: string
  component: FunctionComponent
}

interface ConnectedProps {
  authenticated?: boolean
  loading?: boolean
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  authenticated,
  loading,
  path,
  component,
  ...rest
}) =>
  authenticated && !loading ? (
    <Route {...rest} path={path} component={component} />
  ) : (
    <Redirect to='/login' />
  )

const mapStateToProps: MapStateToProps<
  ConnectedProps,
  PrivateRouteProps,
  StoreState
> = ({ profile: { authenticated, loading } }) => ({
  authenticated,
  loading
})

export default connect(mapStateToProps)(PrivateRoute)
