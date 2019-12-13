import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
  StoreState,
  ActionsTypes,
  ProfileErrorAction,
  ProfileLoadedAction,
  LoadProfileAction,
  UserActedActions,
  UpdateProfileAction,
  ProfileUpdatedAction,
  ProfileUpdateError
} from '../reducers/types'
import { Sanitized } from '../../utils/sanitizers'

export const synchronizer = (): ThunkAction<
  void,
  StoreState,
  null,
  Action<ActionsTypes>
> => {
  return async dispatch => {
    try {
      dispatch<UserActedActions>({
        type: ActionsTypes.USER_ACTED_FALSE
      })
      dispatch<LoadProfileAction>({
        type: ActionsTypes.LOAD_PROFILE
      })
      const response = await axios.get('/api/users/synchronize')
      if (response.status === 200) {
        dispatch<ProfileLoadedAction>({
          type: ActionsTypes.PROFILE_LOADED,
          payload: response.data
        })
        return
      }
    } catch (err) {
      const response: AxiosResponse | undefined = err.response
      if (response) {
        /* got response from server */
        if (response.status === 401 || response.status === 500) {
          dispatch<ProfileErrorAction>({
            type: ActionsTypes.PROFILE_ERROR,
            payload: { ...response.data, status: response.status }
          })
          return
        } else {
          console.log('Error:', response.data)
          dispatch<ProfileErrorAction>({
            type: ActionsTypes.PROFILE_ERROR,
            payload: { error: 'Something went wrong', status: response.status }
          })
          return
        }
      } else {
        /* no response from server */
        console.log('Error:', err.message)
        dispatch<ProfileErrorAction>({
          type: ActionsTypes.PROFILE_ERROR,
          payload: { error: 'Something went wrong', status: undefined }
        })
        return
      }
    }
  }
}

export const updateUser = (
  data: Sanitized
): ThunkAction<void, StoreState, null, Action<ActionsTypes>> => {
  const config: AxiosRequestConfig = {
    url: '/api/users/update',
    method: 'PATCH',
    data
  }

  return async dispatch => {
    try {
      dispatch<UserActedActions>({
        type: ActionsTypes.USER_ACTED_TRUE
      })
      dispatch<UpdateProfileAction>({
        type: ActionsTypes.UPDATE_PROFILE
      })
      const response = await axios(config)
      if (response.status === 200) {
        const { name, email } = response.data
        dispatch<ProfileUpdatedAction>({
          type: ActionsTypes.PROFILE_UPDATED,
          payload: { name, email }
        })
        return
      }
    } catch (err) {
      const response: AxiosResponse | undefined = err.response
      if (response) {
        /* got response from server */
        if (
          response.status === 422 ||
          response.status === 500 ||
          response.status === 409 ||
          response.status === 401
        ) {
          dispatch<ProfileUpdateError>({
            type: ActionsTypes.PROFILE_UPDATE_ERROR,
            payload: { ...response.data, status: response.status }
          })
          return
        } else {
          dispatch<ProfileUpdateError>({
            type: ActionsTypes.PROFILE_UPDATE_ERROR,
            payload: { error: 'Something went wrong', status: response.status }
          })
          return
        }
      } else {
        /* no response from server */
        console.log('Error:', err.message)
        dispatch<ProfileUpdateError>({
          type: ActionsTypes.PROFILE_UPDATE_ERROR,
          payload: { error: 'Something went wrong', status: undefined }
        })
        return
      }
    }
  }
}
