import React, {
  FunctionComponent,
  FormEvent,
  useState,
  useEffect,
  SyntheticEvent
} from 'react'
import { connect } from 'react-redux'
import { unregisterUser } from '../../store/actions'

interface UnregModalConnectedProps {
  dispatch?: Function
}

const UnregisterModal: FunctionComponent<UnregModalConnectedProps> = ({
  dispatch
}) => {
  const [input, setInput] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (input === 'Delete my account') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [input])

  /* the following useEffect clean up input field when modal is hidden */
  useEffect(() => {
    const $modal = document.getElementById('unregisterModal')

    if ($modal) {
      const callback = function(
        mutationList: MutationRecord[],
        observer: MutationObserver
      ) {
        for (let mutation of mutationList) {
          const element = mutation.target as HTMLElement
          const attrMap = element.attributes

          const styleAttr = attrMap.getNamedItem('style')
          if (styleAttr) {
            if (styleAttr.value.includes('display: none;')) {
              setInput('')
            }
          }
        }
      }
      const config: MutationObserverInit = {
        attributes: true,
        attributeFilter: ['style']
      }
      const observer = new MutationObserver(callback)
      observer.observe($modal, config)

      return () => {
        observer.disconnect()
      }
    }
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input === 'Delete my account') {
      if (dispatch) {
        dispatch(unregisterUser())
      }
    }
  }

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setInput(target.value)
  }

  return (
    <div
      className='modal fade'
      id='unregisterModal'
      tabIndex={-1}
      role='dialog'
      aria-labelledby='unregisterModalTitle'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='unregisterModalTitle'>
              Account Deletion
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>

          <div className='modal-body'>
            <form id='account-deletion' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='confirmation'>
                  Type 'Delete my account' and hit 'Submit.'
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='confirmation'
                  value={input}
                  onChange={handleChange}
                />
                <small className='form-text text-muted'>
                  This action will erase all your data permanently.
                </small>
              </div>
            </form>
          </div>

          <div className='modal-footer'>
            <button
              form='account-deletion'
              type='submit'
              className='btn btn-cool'
              disabled={disabled}
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}
              data-toggle='modal'
              data-target='#unregisterModal'
            >
              <p>Submit</p>
            </button>
            <button
              type='button'
              className='btn btn-cool btn-cool-cancel'
              data-dismiss='modal'
            >
              <p>Cancel</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect()(UnregisterModal)
