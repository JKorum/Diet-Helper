import React, { FunctionComponent, useEffect } from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import { AlertState, StoreState } from '../../store/reducers'
import { AlertActions, ActionsTypes } from '../../store/reducers'

interface AlertOwnProps {}
interface AlertConnectedProps {
  alert: AlertState | null
  dispatch?: Dispatch<AlertActions>
}

const Alert: FunctionComponent<AlertConnectedProps> = ({ alert, dispatch }) => {
  useEffect(() => {
    return () => {
      if (dispatch && alert) {
        dispatch({
          type: ActionsTypes.REMOVE_ALERT
        })
      }
    }
  }, [alert])

  const handleClick = () => {
    if (dispatch) {
      dispatch({
        type: ActionsTypes.REMOVE_ALERT
      })
    }
  }

  if (alert) {
    const { text, color } = alert
    let status: string
    if (color === 'success') {
      status = 'Done!'
    } else if (color === 'danger') {
      status = 'Error.'
    } else {
      status = 'Sorry.'
    }

    return (
      <div
        className={`alert alert-${color} alert-dismissible fade show fixed-bottom mb-0 rounded-0`}
        role='alert'
      >
        <strong>{status}</strong> {text}
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
          onClick={handleClick}
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps: MapStateToProps<
  AlertConnectedProps,
  AlertOwnProps,
  StoreState
> = ({ alert }) => ({
  alert
})

export default connect(mapStateToProps)(Alert)
