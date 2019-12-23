import React, {
  FunctionComponent,
  SyntheticEvent,
  FormEvent,
  useState,
  useEffect
} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect, MapStateToProps } from 'react-redux'
import { StoreState, User, Error } from '../../store/reducers'
import { registerUser, RegisterCredentials } from '../../store/actions'

export enum Fields {
  name = 'name',
  email = 'email',
  password = 'password',
  confirm = 'confirm'
}

interface OwnProps {}

interface RegisterProps {
  user: User | null
  loading: boolean
  authenticated: boolean
  error: Error | null
  dispatch?: Function
  userActed: boolean
}

const Register: FunctionComponent<RegisterProps> = ({
  user,
  loading,
  authenticated,
  error,
  dispatch,
  userActed
}) => {
  const [userData, setUserdata] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  })

  const { name, email, password, confirm } = userData

  useEffect(() => {
    const $email = document.getElementById('email')
    if ($email) {
      if (userActed && !loading && error && error.status === 409) {
        $email.classList.add('is-invalid')
      }
    }
  }, [loading, error, userActed])

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const name = target.name
    setUserdata(prevState => ({
      ...prevState,
      [name]: target.value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const $name = document.getElementById('name')
    const $email = document.getElementById('email')
    const $password = document.getElementById('password')
    const $confirm = document.getElementById('confirm')

    $name && $name.classList.add('is-valid')

    if ($email) {
      $email.classList.remove('is-invalid')
      $email.classList.add('is-valid')
    }

    if (password !== confirm) {
      if ($password && $confirm) {
        $password.classList.remove('is-valid')
        $confirm.classList.remove('is-valid')
        $password.classList.add('is-invalid')
        $confirm.classList.add('is-invalid')
      }
    } else {
      if ($password && $confirm) {
        $password.classList.remove('is-invalid')
        $confirm.classList.remove('is-invalid')
        $password.classList.add('is-valid')
        $confirm.classList.add('is-valid')

        /* passwords are matched */
        const data: RegisterCredentials = { name, email, password }
        if (dispatch) {
          dispatch(registerUser(data))
        }

        /* credentials valid -> await authentication */
        $name && $name.classList.remove('is-valid')
        $email && $email.classList.remove('is-valid')
        $password.classList.remove('is-valid')
        $confirm.classList.remove('is-valid')
      }
    }
  }

  if (authenticated) {
    return <Redirect to='/search' />
  } else {
    return (
      <div className='background d-flex align-items-center'>
        <div className='flex-grow-1 bg-white'>
          <div className='container'>
            <div className='row justify-content-center py-3'>
              <div className='col-md-6'>
                <h1 className='display-3'>Register</h1>
                <hr className='my-3' />
                <form id='register' onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                      type='text'
                      className='form-control'
                      id='name'
                      name={Fields.name}
                      value={name}
                      onChange={handleChange}
                      minLength={2}
                      required
                    />
                    <div className='valid-feedback'>Excellent!</div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      name={Fields.email}
                      value={email}
                      onChange={handleChange}
                      required
                    />
                    <div className='valid-feedback'>Excellent!</div>
                    <div className='invalid-feedback'>
                      Sorry, it looks like another user owns this email address.
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
                    <div className='valid-feedback'>Excellent!</div>
                    <div className='invalid-feedback'>
                      Passwords don't match.
                    </div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='confirm'>Confirm password</label>
                    <input
                      type='password'
                      className='form-control'
                      id='confirm'
                      name={Fields.confirm}
                      value={confirm}
                      onChange={handleChange}
                      minLength={6}
                      required
                    />
                    <div className='valid-feedback'>Excellent!</div>
                  </div>
                </form>
                <button
                  type='submit'
                  className='btn btn-cool mr-1'
                  form='register'
                >
                  <span
                    className='spinner-border spinner-border-sm align-middle'
                    role='status'
                    aria-hidden='true'
                    style={
                      loading
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

const mapStateToProps: MapStateToProps<RegisterProps, OwnProps, StoreState> = ({
  profile: { user, loading, authenticated, error },
  userActed
}) => ({
  user,
  loading,
  authenticated,
  error,
  userActed
})

export default connect(mapStateToProps)(Register)
