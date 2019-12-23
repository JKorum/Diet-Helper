import React, {
  FunctionComponent,
  useState,
  SyntheticEvent,
  FormEvent,
  useEffect
} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect, MapStateToProps } from 'react-redux'
import { StoreState, Error } from '../../store/reducers'
import { LoginCredentials } from '../../store/actions'
import { Fields } from './Register'
import { loginUser } from '../../store/actions'

interface LoginConnectedProps {
  authenticated: boolean
  loading: boolean
  userActed: boolean
  error: null | Error
  dispatch?: Function
}

interface LoginOwnProps {}

const Login: FunctionComponent<LoginConnectedProps> = ({
  authenticated,
  loading,
  userActed,
  error,
  dispatch
}) => {
  const [userData, setUserData] = useState<LoginCredentials>({
    email: '',
    password: ''
  })

  const { email, password } = userData

  useEffect(() => {
    const $email = document.getElementById('email')
    const $password = document.getElementById('password')
    if ($email && $password) {
      $email.classList.remove('is-invalid')
      $password.classList.remove('is-invalid')

      if (
        userActed &&
        !loading &&
        error &&
        (error.status === 401 || error.status === 500)
      ) {
        $email.classList.add('is-invalid')
        $password.classList.add('is-invalid')
      }
    }
  }, [userActed, error, loading])

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const name = target.name
    setUserData(prevState => ({
      ...prevState,
      [name]: target.value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (dispatch) {
      dispatch(loginUser(userData))
    }
  }

  if (authenticated && !loading) {
    return <Redirect to='/search' />
  } else {
    return (
      <div className='background d-flex align-items-center'>
        <div className='flex-grow-1 bg-white'>
          <div className='container'>
            <div className='row justify-content-center py-3'>
              <div className='col-md-6'>
                <h1 className='display-3'>Login</h1>
                <hr className='my-3' />
                <form id='login' onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='email'>Email address</label>
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      name={Fields.email}
                      value={email}
                      onChange={handleChange}
                      required
                    />
                    <div className='invalid-feedback'>
                      {error && error.status === 401
                        ? 'Sorry, authorization failed.'
                        : 'Sorry, it looks like there is a server problem.'}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      className='form-control'
                      id='password'
                      name={Fields.password}
                      value={password}
                      onChange={handleChange}
                      minLength={6}
                      required
                    />
                  </div>
                </form>
                <button
                  type='submit'
                  className='btn btn-cool mr-1'
                  form='login'
                >
                  <span
                    className='spinner-border spinner-border-sm align-middle'
                    role='status'
                    aria-hidden='true'
                    style={
                      loading && userActed
                        ? { display: 'inline-block' }
                        : { display: 'none' }
                    }
                  ></span>{' '}
                  <p>Submit</p>
                </button>
                <Link to='/' className='btn btn-cool btn-cool-cancel'>
                  <p>Go Back</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<
  LoginConnectedProps,
  LoginOwnProps,
  StoreState
> = ({ profile: { authenticated, error, loading }, userActed }) => ({
  authenticated,
  loading,
  userActed,
  error
})

export default connect(mapStateToProps)(Login)
