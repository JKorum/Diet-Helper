import React, {
  Fragment,
  FunctionComponent,
  useState,
  SyntheticEvent,
  FormEvent,
  useEffect
} from 'react'
import { connect, MapStateToProps } from 'react-redux'
import Navigation from './Navigation'
import { Fields } from './Register'
import { StoreState, User } from '../store/reducers'
import { updateSanitizer } from '../utils/sanitizers'
import { ActionsTypes, Error } from '../store/reducers'
import { updateUser } from '../store/actions'
import UnregisterModal from './UnregisterModal'
import Alert from './Alert'

interface ChangeCredConnectedProps {
  loading: boolean
  user: User | null
  userActed: boolean
  dispatch?: Function
  error: Error | null
}

interface ChangeCredOwnProps {}

export interface CredFormData {
  name: string
  email: string
  password: string
}

const ChangeCredentials: FunctionComponent<ChangeCredConnectedProps> = ({
  loading,
  user,
  userActed,
  dispatch,
  error
}) => {
  const [userData, setUserData] = useState<CredFormData>({
    name: '',
    email: '',
    password: ''
  })

  const [disabled, setDisabled] = useState(true)

  const { name, email, password } = userData

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: ActionsTypes.USER_ACTED_FALSE
      })
    }
  }, [dispatch])

  useEffect(() => {
    const $email = document.getElementById('email')
    if ($email) {
      $email.classList.remove('is-invalid')
      if (userActed && !loading && error && error.status === 409) {
        $email.classList.add('is-invalid')
      }
    }
  }, [userActed, loading, error])

  useEffect(() => {
    if (name === '' && email === '' && password === '') {
      setDisabled(true)
      const $email = document.getElementById('email')
      if ($email) {
        $email.classList.remove('is-invalid')
      }
    } else {
      setDisabled(false)
    }
  }, [userData])

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
    const data = updateSanitizer(userData)
    if (data) {
      if (dispatch) {
        dispatch(updateUser(data))
      }
    }
  }

  return (
    <Fragment>
      <UnregisterModal />
      <Navigation />
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-6'>
            <h1 className='display-3 mt-5'>Update your data</h1>
            <hr className='my-3' />
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>New name</label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  placeholder={user ? user.name : 'no data'}
                  name={Fields.name}
                  value={name}
                  minLength={2}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>New email address</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder={user ? user.email : 'no data'}
                  name={Fields.email}
                  value={email}
                  onChange={handleChange}
                />
                <div className='invalid-feedback'>
                  Sorry, it looks like another user owns this email address.
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='password'>New password</label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  placeholder='******'
                  name={Fields.password}
                  minLength={6}
                  value={password}
                  onChange={handleChange}
                />
                <small className='form-text text-muted'>
                  *All form fields are optional.
                </small>
              </div>

              <button
                id='submit'
                type='submit'
                className='btn btn-outline-primary'
                disabled={disabled}
              >
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                  style={
                    loading && userActed
                      ? { display: 'inline-block' }
                      : { display: 'none' }
                  }
                ></span>{' '}
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Alert />
    </Fragment>
  )
}

const mapStateToProps: MapStateToProps<
  ChangeCredConnectedProps,
  ChangeCredOwnProps,
  StoreState
> = ({ profile: { user, loading, error }, userActed }) => ({
  loading,
  user,
  userActed,
  error
})

export default connect(mapStateToProps)(ChangeCredentials)
