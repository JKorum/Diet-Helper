import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Action } from 'redux'
import {
  ActionsTypes,
  LoadProfileAction,
  ProfileLoadedAction,
  ProfileErrorAction,
  StoreState,
  LogoutAction,
  UserActedActions,
  RemoveProfileError,
  AccountDeletedAction
} from '../reducers'
import { ThunkAction } from 'redux-thunk'

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export const registerUser = (
  data: RegisterCredentials
): ThunkAction<void, StoreState, null, Action<ActionsTypes>> => {
  const config: AxiosRequestConfig = {
    url: '/api/register',
    method: 'POST',
    data
  }
  return async dispatch => {
    try {
      dispatch<RemoveProfileError>({
        type: ActionsTypes.REMOVE_PROFILE_ERROR
      })
      const primus = await axios(config)
      if (primus.status === 201) {
        dispatch<LoadProfileAction>({
          type: ActionsTypes.LOAD_PROFILE
        })
        const second = await axios.get('/api/users/synchronize')
        if (second.status === 200) {
          dispatch<ProfileLoadedAction>({
            type: ActionsTypes.PROFILE_LOADED,
            payload: second.data
          })
        }
      }
    } catch (err) {
      const response: AxiosResponse | undefined = err.response
      if (response) {
        if (
          response.status === 422 ||
          response.status === 500 ||
          response.status === 401
        ) {
          dispatch<ProfileErrorAction>({
            type: ActionsTypes.PROFILE_ERROR,
            payload: { ...response.data, status: response.status }
          })
        } else {
          console.log('Error:', response.data)
          dispatch<ProfileErrorAction>({
            type: ActionsTypes.PROFILE_ERROR,
            payload: { error: 'Something went wrong', status: response.status }
          })
        }
      } else {
        console.log('Error:', err.message)
        dispatch<ProfileErrorAction>({
          type: ActionsTypes.PROFILE_ERROR,
          payload: { error: 'Something went wrong', status: undefined }
        })
      }
    }
  }
}

export const unregisterUser = (): ThunkAction<
  void,
  StoreState,
  null,
  Action<ActionsTypes>
> => {
  return async dispatch => {
    try {
      const response = await axios.delete('/api/unregister')
      if (response.status === 204) {
        dispatch<AccountDeletedAction>({
          type: ActionsTypes.ACCOUNT_DELETED
        })
      }
    } catch (err) {
      const response: AxiosResponse | undefined = err.response
      /* got response from server */
      if (response) {
        if (response.status === 500 || response.status === 401) {
          dispatch<ProfileErrorAction>({
            type: ActionsTypes.PROFILE_ERROR,
            payload: {
              ...response.data,
              status: response.status
            }
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

export const loginUser = (
  data: LoginCredentials
): ThunkAction<void, StoreState, null, Action<ActionsTypes>> => {
  const config: AxiosRequestConfig = {
    url: '/api/login',
    method: 'POST',
    data
  }
  return async dispatch => {
    try {
      dispatch<RemoveProfileError>({
        type: ActionsTypes.REMOVE_PROFILE_ERROR
      })
      dispatch<UserActedActions>({
        type: ActionsTypes.USER_ACTED_TRUE
      })
      const primus = await axios(config)
      if (primus.status === 200) {
        dispatch<LoadProfileAction>({
          type: ActionsTypes.LOAD_PROFILE
        })
        const second = await axios.get('api/users/synchronize')
        if (second.status === 200) {
          dispatch<ProfileLoadedAction>({
            type: ActionsTypes.PROFILE_LOADED,
            payload: second.data
          })
          return
        }
      }
    } catch (err) {
      const response: AxiosResponse | undefined = err.response
      /* got response from server */
      if (response) {
        if (
          response.status === 401 ||
          response.status === 500 ||
          response.status === 422
        ) {
          dispatch<ProfileErrorAction>({
            type: ActionsTypes.PROFILE_ERROR,
            payload: {
              ...response.data,
              status: response.status
            }
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

export const logoutUser = (): ThunkAction<
  void,
  StoreState,
  null,
  Action<ActionsTypes>
> => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/logout')
      if (response.status === 200) {
        dispatch<LogoutAction>({
          type: ActionsTypes.LOGOUT
        })
        dispatch<UserActedActions>({
          type: ActionsTypes.USER_ACTED_FALSE
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
