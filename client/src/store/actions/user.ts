import axios, { AxiosResponse } from 'axios'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
  StoreState,
  ActionsTypes,
  ProfileErrorAction,
  ProfileLoadedAction,
  LoadProfileAction
} from '../reducers/types'

export const synchronizer = (): ThunkAction<
  void,
  StoreState,
  null,
  Action<ActionsTypes>
> => {
  return async dispatch => {
    try {
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
