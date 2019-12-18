import axios, { AxiosResponse } from 'axios'
import uuid from 'uuid/v1'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import {
  ActionsTypes,
  RecipesActions,
  StoreState,
  Recipe,
  UserActedActions,
  AlertActions
} from '../reducers'

interface FetchedResult {
  more: boolean
  hits: [
    {
      recipe: Recipe
    }
  ]
}

export const fetchRecipes = (
  query: string,
  successive: boolean,
  from: number
): ThunkAction<void, StoreState, null, Action<ActionsTypes>> => {
  return async dispatch => {
    try {
      dispatch<UserActedActions>({
        type: ActionsTypes.USER_ACTED_TRUE
      })
      dispatch<RecipesActions>({
        type: ActionsTypes.LOAD_RECIPES
      })
      dispatch<RecipesActions>({
        type: ActionsTypes.RECIPES_INFINITE_BLOCK
      })

      const response = await axios.get(`/api/recipes?${query}&from=${from}`)
      if (response.status === 200) {
        const { more, hits } = response.data as FetchedResult

        let recipes: Recipe[]

        if (hits.length > 0) {
          recipes = hits.map(item => {
            item.recipe.clientSideId = uuid()
            return item.recipe
          })
        } else {
          recipes = []
        }

        if (successive) {
          dispatch<RecipesActions>({
            type: ActionsTypes.RECIPES_LOADED_SUC,
            payload: {
              recipes,
              more
            }
          })
          dispatch<RecipesActions>({
            type: ActionsTypes.RECIPES_INFINITE_ALLOW
          })
          return
        } else {
          dispatch<RecipesActions>({
            type: ActionsTypes.RECIPES_LOADED_NEW,
            payload: {
              recipes,
              more
            }
          })
          dispatch<RecipesActions>({
            type: ActionsTypes.RECIPES_INFINITE_ALLOW
          })
          return
        }
      }
    } catch (err) {
      const response: AxiosResponse | undefined = err.response
      /* got response from server */
      if (response) {
        if (
          response.status === 422 ||
          response.status === 404 ||
          response.status === 500 ||
          response.status === 401
        ) {
          dispatch<RecipesActions>({
            type: ActionsTypes.RECIPES_ERROR,
            payload: { error: response.data, status: response.status }
          })
          dispatch<RecipesActions>({
            type: ActionsTypes.RECIPES_INFINITE_ALLOW
          })

          if (response.status === 404 || response.status === 500) {
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
          dispatch<RecipesActions>({
            type: ActionsTypes.RECIPES_ERROR,
            payload: { error: 'Something went wrong', status: response.status }
          })
          dispatch<RecipesActions>({
            type: ActionsTypes.RECIPES_INFINITE_ALLOW
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
        dispatch<RecipesActions>({
          type: ActionsTypes.RECIPES_ERROR,
          payload: { error: 'Something went wrong', status: undefined }
        })
        dispatch<RecipesActions>({
          type: ActionsTypes.RECIPES_INFINITE_ALLOW
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
    }
  }
}
