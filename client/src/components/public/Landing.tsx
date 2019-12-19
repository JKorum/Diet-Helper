import React, { FunctionComponent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect, MapStateToProps } from 'react-redux'
import { StoreState } from '../../store/reducers'

interface LandingConnectedProps {
  authenticated: boolean
}

interface LandingOwnProps {}

export const Landing: FunctionComponent<LandingConnectedProps> = ({
  authenticated
}) => {
  if (authenticated) {
    return <Redirect to='/search' />
  } else {
    return (
      <div className='background d-flex align-items-center'>
        <div className='jumbotron jumbotron-fluid flex-grow-1'>
          <div className='container'>
            <h1 className='display-1'>Diet Helper</h1>
            <p className='lead'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
            <hr className='my-4' />
            <Link to='/login' className='btn btn-outline-primary mr-1 btn-lg'>
              Login
            </Link>
            <Link to='/register' className='btn btn-outline-primary btn-lg'>
              Register
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<
  LandingConnectedProps,
  LandingOwnProps,
  StoreState
> = ({ profile: { authenticated } }) => ({
  authenticated
})

export default connect(mapStateToProps)(Landing)
