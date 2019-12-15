import React, {
  Fragment,
  FunctionComponent,
  useState,
  SyntheticEvent,
  FormEvent,
  useEffect
} from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AlertActions, ActionsTypes } from '../store/reducers'
import { Error } from '../store/reducers'
import {
  ParsedAnalysisResult,
  parseAnalysisResult
} from '../utils/parseAnalysis'
import Navigation from './Navigation'
import UnregisterModal from './UnregisterModal'
import { AnalysisModal } from './AnalysisModal'
import Alert from './Alert'

interface RecAnalysisConnectedProps {
  dispatch: Dispatch<AlertActions>
}

const placeholder =
  '300g fried chicken,\n200g boiled rice,\n3 tomatoes,\n4 cucumbers,\n1 tablespoon olive oil'

const RecipeAnalysis: FunctionComponent<RecAnalysisConnectedProps> = ({
  dispatch
}) => {
  const [data, setData] = useState({
    title: '',
    ingr: ''
  })

  const [loading, setLoading] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [resultDisabled, setResultDisabled] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [result, setResult] = useState<ParsedAnalysisResult | null>(null)

  const { title, ingr } = data

  useEffect(() => {
    if (title === '' || ingr === '') {
      setSubmitDisabled(true)
    } else {
      setSubmitDisabled(false)
    }
  }, [data])

  useEffect(() => {
    if (!result) {
      setResultDisabled(true)
    } else {
      setResultDisabled(false)
      dispatch({
        type: ActionsTypes.SET_ALERT,
        payload: {
          text: "You can now hit the 'Result' button to view nutrition data.",
          color: 'success'
        }
      })
    }
  }, [result])

  useEffect(() => {
    if (error) {
      const { status } = error
      if (status === 422 || status === 555 || status === 404) {
        dispatch({
          type: ActionsTypes.SET_ALERT,
          payload: {
            text:
              'Please, check the recipe text for accidental typos or missing commas between the ingredients and try again.',
            color: 'danger'
          }
        })
      } else {
        dispatch({
          type: ActionsTypes.SET_ALERT,
          payload: {
            text:
              'It looks like there is a problem with the server. Please, try again later.',
            color: 'danger'
          }
        })
      }
    }
  }, [error])

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const name = target.name
    setData(prevState => ({
      ...prevState,
      [name]: target.value
    }))
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    if (title !== '' && ingr !== '') {
      try {
        const config: AxiosRequestConfig = {
          url: 'api/recipes/analysis/recipe',
          method: 'POST',
          data
        }
        setLoading(true)
        const response = await axios(config)
        if (response.status === 200) {
          const result = parseAnalysisResult(response.data)
          setResult(result)
          setLoading(false)
          return
        }
      } catch (err) {
        const response: AxiosResponse | undefined = err.response
        if (response) {
          /* got response from server */
          if (
            response.status === 422 ||
            response.status === 404 ||
            response.status === 555 ||
            response.status === 500 ||
            response.status === 401
          ) {
            setError({ error: response.data.error, status: response.status })
            setLoading(false)
            return
          } else {
            setError({ error: 'Something went wrong', status: response.status })
            setLoading(false)
            return
          }
        } else {
          /* no response from server */
          setError({ error: 'Something went wrong', status: undefined })
          setLoading(false)
          return
        }
      }
    }
  }

  return (
    <Fragment>
      <UnregisterModal />
      {result && <AnalysisModal title={data.title.trim()} data={result} />}
      <Navigation />
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-6'>
            <h1 className='display-3 mt-5'>Analyze recipe</h1>
            <hr className='my-3' />
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='My evening meal'
                  name='title'
                  value={title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='text'>
                  Ingredients with measure or quantity
                </label>
                <textarea
                  id='text'
                  name='ingr'
                  className='form-control'
                  rows={8}
                  placeholder={placeholder}
                  value={ingr}
                  onChange={handleChange}
                  required
                ></textarea>
                <small className='form-text text-muted'>
                  *Please, separate the ingredients with commas.
                </small>
              </div>
              <button
                type='submit'
                className='btn btn-outline-primary mr-1'
                disabled={submitDisabled}
              >
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                  style={
                    loading ? { display: 'inline-block' } : { display: 'none' }
                  }
                ></span>{' '}
                Submit
              </button>
              <button
                type='button'
                className='btn btn-outline-secondary'
                data-toggle='modal'
                data-target='#analysisModal'
                disabled={resultDisabled}
              >
                Results
              </button>
            </form>
          </div>
        </div>
      </div>
      <Alert />
    </Fragment>
  )
}

export default connect()(RecipeAnalysis)
