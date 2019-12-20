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
  ProfileUpdateError,
  AlertActions,
  CollectionErrorAction,
  DeleteCollectionAction,
  DeleteCollectionItemAction,
  Recipe,
  SaveCollectionItemAction
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
        dispatch<AlertActions>({
          type: ActionsTypes.SET_ALERT,
          payload: {
            text: 'Your profile is updated.',
            color: 'success'
          }
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
          if (response.status === 500) {
            dispatch<AlertActions>({
              type: ActionsTypes.SET_ALERT,
              payload: {
                text:
                  'It looks like there is a problem with the server. Please, try again later.',
                color: 'danger'
              }
            })
            return
          }
          return
        } else {
          dispatch<ProfileUpdateError>({
            type: ActionsTypes.PROFILE_UPDATE_ERROR,
            payload: { error: 'Something went wrong', status: response.status }
          })
          dispatch<AlertActions>({
            type: ActionsTypes.SET_ALERT,
            payload: {
              text:
                'It looks like there is a problem with the server. Please, try again later.',
              color: 'danger'
            }
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
        dispatch<AlertActions>({
          type: ActionsTypes.SET_ALERT,
          payload: {
            text: 'Something went wrong. Please, try again later.',
            color: 'danger'
          }
        })
        return
      }
    }
  }
}

export const deleteCollectionItem = (
  id: string
): ThunkAction<void, StoreState, null, Action<ActionsTypes>> => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/api/recipes/${id}`)
      if (response.status === 204) {
        dispatch<DeleteCollectionItemAction>({
          type: ActionsTypes.COLLECTION_DELETE_ITEM,
          payload: id
        })
        dispatch<AlertActions>({
          type: ActionsTypes.SET_ALERT,
          payload: {
            text: 'The recipe is deleted.',
            color: 'success'
          }
        })
        return
      }
    } catch (err) {
      const response: AxiosResponse | undefined = err.response
      if (response) {
        /* got response from server */
        if (
          response.status === 403 ||
          response.status === 400 ||
          response.status === 500 ||
          response.status === 401
        ) {
          dispatch<CollectionErrorAction>({
            type: ActionsTypes.COLLECTION_ERROR,
            payload: { error: response.data, status: response.status }
          })
          dispatch<AlertActions>({
            type: ActionsTypes.SET_ALERT,
            payload: {
              text:
                'It looks like there is a problem with the server. Please, try again later.',
              color: 'danger'
            }
          })
          return
        } else {
          dispatch<CollectionErrorAction>({
            type: ActionsTypes.COLLECTION_ERROR,
            payload: { error: response.data, status: response.status }
          })
          dispatch<AlertActions>({
            type: ActionsTypes.SET_ALERT,
            payload: {
              text: 'Something went wrong. Please, try again later.',
              color: 'danger'
            }
          })
          return
        }
      } else {
        /* no response from server */
        console.log('Error:', err.message)
        dispatch<CollectionErrorAction>({
          type: ActionsTypes.COLLECTION_ERROR,
          payload: { error: 'Something went wrong', status: undefined }
        })
        dispatch<AlertActions>({
          type: ActionsTypes.SET_ALERT,
          payload: {
            text: 'Something went wrong. Please, try again later.',
            color: 'danger'
          }
        })
        return
      }
    }
  }
}

export const deleteCollection = (): ThunkAction<
  void,
  StoreState,
  null,
  Action<ActionsTypes>
> => {
  return async dispatch => {
    try {
      const response = await axios.delete('/api/recipes')
      if (response.status === 204) {
        dispatch<DeleteCollectionAction>({
          type: ActionsTypes.DELETE_COLLECTION
        })
        dispatch<AlertActions>({
          type: ActionsTypes.SET_ALERT,
          payload: {
            text: 'The collection is deleted.',
            color: 'success'
          }
        })
        return
      }
    } catch (err) {
      const response: AxiosResponse | undefined = err.response
      if (response) {
        /* got response from server */
        if (response.status === 500 || response.status === 401) {
          dispatch<CollectionErrorAction>({
            type: ActionsTypes.COLLECTION_ERROR,
            payload: { error: response.data, status: response.status }
          })
          dispatch<AlertActions>({
            type: ActionsTypes.SET_ALERT,
            payload: {
              text:
                'It looks like there is a problem with the server. Please, try again later.',
              color: 'danger'
            }
          })
          return
        } else {
          dispatch<CollectionErrorAction>({
            type: ActionsTypes.COLLECTION_ERROR,
            payload: { error: response.data, status: response.status }
          })
          dispatch<AlertActions>({
            type: ActionsTypes.SET_ALERT,
            payload: {
              text: 'Something went wrong. Please, try again later.',
              color: 'danger'
            }
          })
          return
        }
      } else {
        /* no response from server */
        console.log('Error:', err.message)
        dispatch<CollectionErrorAction>({
          type: ActionsTypes.COLLECTION_ERROR,
          payload: { error: 'Something went wrong', status: undefined }
        })
        dispatch<AlertActions>({
          type: ActionsTypes.SET_ALERT,
          payload: {
            text: 'Something went wrong. Please, try again later.',
            color: 'danger'
          }
        })
        return
      }
    }
  }
}

export const saveCollectionItem = (
  data: Recipe,
  fromModal: boolean
): ThunkAction<void, StoreState, null, Action<ActionsTypes>> => {
  const config: AxiosRequestConfig = {
    url: '/api/recipes/save',
    method: 'POST',
    data
  }
  return async dispatch => {
    try {
      const response = await axios(config)
      if (response.status === 200) {
        dispatch<SaveCollectionItemAction>({
          type: ActionsTypes.COLLECTION_SAVE_ITEM,
          payload: response.data
        })
        !fromModal &&
          dispatch<AlertActions>({
            type: ActionsTypes.SET_ALERT,
            payload: {
              text: 'The recipe is added to the collection.',
              color: 'success'
            }
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
          response.status === 401
        ) {
          dispatch<CollectionErrorAction>({
            type: ActionsTypes.COLLECTION_ERROR,
            payload: { error: response.data, status: response.status }
          })
          !fromModal &&
            dispatch<AlertActions>({
              type: ActionsTypes.SET_ALERT,
              payload: {
                text:
                  'It looks like there is a problem with the server. Please, try again later.',
                color: 'danger'
              }
            })
          return
        } else {
          dispatch<CollectionErrorAction>({
            type: ActionsTypes.COLLECTION_ERROR,
            payload: { error: response.data, status: response.status }
          })
          !fromModal &&
            dispatch<AlertActions>({
              type: ActionsTypes.SET_ALERT,
              payload: {
                text: 'Something went wrong. Please, try again later.',
                color: 'danger'
              }
            })
          return
        }
      } else {
        /* no response from server */
        console.log('Error:', err.message)
        dispatch<CollectionErrorAction>({
          type: ActionsTypes.COLLECTION_ERROR,
          payload: { error: 'Something went wrong', status: undefined }
        })
        !fromModal &&
          dispatch<AlertActions>({
            type: ActionsTypes.SET_ALERT,
            payload: {
              text: 'Something went wrong. Please, try again later.',
              color: 'danger'
            }
          })
        return
      }
    }
  }
}
