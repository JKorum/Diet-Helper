import { ProfileState, ActionsTypes, ProfileActions } from './types'

const initialState: ProfileState = {
  user: null,
  loading: false,
  authenticated: false,
  error: null
}

export const profileReducer = (
  state = initialState,
  action: ProfileActions
): ProfileState => {
  switch (action.type) {
    case ActionsTypes.LOAD_PROFILE:
      return {
        ...state,
        user: null,
        loading: true,
        error: null
      }
    case ActionsTypes.PROFILE_LOADED:
      return {
        user: action.payload,
        loading: false,
        authenticated: true,
        error: null
      }
    case ActionsTypes.PROFILE_ERROR:
      return {
        user: null,
        loading: false,
        authenticated: false,
        error: action.payload
      }
    case ActionsTypes.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        authenticated: false
      }
    case ActionsTypes.ACCOUNT_DELETED:
      return {
        user: null,
        loading: false,
        authenticated: false,
        error: null
      }
    case ActionsTypes.REMOVE_PROFILE_ERROR:
      return {
        ...state,
        error: null
      }
    case ActionsTypes.UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
        error: null
      }
    case ActionsTypes.PROFILE_UPDATED:
      if (state.user) {
        return {
          ...state,
          user: { ...state.user, ...action.payload },
          loading: false
        }
      } else {
        return {
          ...state,
          loading: false
        }
      }
    case ActionsTypes.PROFILE_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case ActionsTypes.COLLECTION_SAVE_ITEM:
      if (state.user) {
        const recipes = [...state.user.recipes, action.payload]
        return {
          ...state,
          user: { ...state.user, recipes }
        }
      } else {
        return state
      }
    case ActionsTypes.COLLECTION_DELETE_ITEM:
      if (state.user && state.user.recipes.length > 0) {
        const recipes = state.user.recipes.filter(
          recipe => recipe._id !== action.payload
        )
        return {
          ...state,
          user: { ...state.user, recipes }
        }
      } else {
        return state
      }
    case ActionsTypes.DELETE_COLLECTION:
      if (state.user) {
        return {
          ...state,
          user: { ...state.user, recipes: [] }
        }
      } else {
        return state
      }
    case ActionsTypes.COLLECTION_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
