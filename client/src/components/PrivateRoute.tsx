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
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  authenticated,

  path,
  component,
  ...rest
}) => {
  if (authenticated !== undefined) {
    return authenticated ? (
      <Route {...rest} path={path} component={component} />
    ) : (
      <Redirect to='/login' />
    )
  } else {
    return <Redirect to='/login' />
  }
}

const mapStateToProps: MapStateToProps<
  ConnectedProps,
  PrivateRouteProps,
  StoreState
> = ({ profile: { authenticated } }) => ({
  authenticated
})

export default connect(mapStateToProps)(PrivateRoute)
