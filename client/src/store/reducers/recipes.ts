import { RecipesState, RecipesActions, ActionsTypes } from './types'

const initialState: RecipesState = {
  fetched: null,
  loading: false,
  error: null
}

export const recipesReducer = (
  state = initialState,
  action: RecipesActions
): RecipesState => {
  switch (action.type) {
    case ActionsTypes.LOAD_RECIPES:
      return {
        fetched: null,
        loading: true,
        error: null
      }
    case ActionsTypes.RECIPES_LOADED:
      return {
        fetched: action.payload,
        loading: false,
        error: null
      }
    case ActionsTypes.RECIPES_ERROR:
      return {
        fetched: null,
        loading: false,
        error: action.payload
      }
    case ActionsTypes.LOGOUT:
      return {
        ...state,
        fetched: null,
        loading: false
      }
    case ActionsTypes.ACCOUNT_DELETED:
      return {
        fetched: null,
        loading: false,
        error: null
      }
    default:
      return state
  }
}
