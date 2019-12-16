import { RecipesState, RecipesActions, ActionsTypes } from './types'

const initialState: RecipesState = {
  fetched: null,
  more: undefined,
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
        ...state,
        loading: true,
        error: null
      }
    case ActionsTypes.RECIPES_LOADED_NEW:
      return {
        fetched: action.payload.recipes,
        more: action.payload.more,
        loading: false,
        error: null
      }
    case ActionsTypes.RECIPES_LOADED_SUC:
      if (state.fetched) {
        return {
          fetched: [...state.fetched, ...action.payload.recipes],
          more: action.payload.more,
          loading: false,
          error: null
        }
      } else {
        return state
      }
    case ActionsTypes.RECIPES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case ActionsTypes.LOGOUT:
    case ActionsTypes.ACCOUNT_DELETED:
      return {
        fetched: null,
        more: undefined,
        loading: false,
        error: null
      }
    default:
      return state
  }
}
