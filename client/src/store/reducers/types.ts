export interface Recipe {
  owner?: any
  _id?: any
  label: string
  image: string
  source: string
  url: string
  yield: number
  dietLabels: string[]
  healthLabels: string[]
  cautions: string[]
  ingredientLines: string[]
  calories: number
  totalWeight: number
  totalTime: number
}

export interface User {
  id: any
  name: string
  email: string
  recipes: Recipe[]
}

export interface Error {
  error: string
  status: number | undefined
}

export interface ProfileState {
  user: User | null
  loading: boolean
  authenticated: boolean
  error: Error | null
}

export interface RecipesState {
  fetched: Recipe[] | null
  loading: boolean
  error: Error | null
}

export interface AlertState {
  text: string
  color: string
}

export enum ActionsTypes {
  LOAD_PROFILE = 'LOAD_PROFILE',
  PROFILE_LOADED = 'PROFILE_LOADED',
  PROFILE_ERROR = 'PROFILE_ERROR',
  LOAD_RECIPES = 'LOAD_RECIPES',
  RECIPES_LOADED = 'RECIPES_LOADED',
  RECIPES_ERROR = 'RECIPES_ERROR',
  SET_ALERT = 'SET_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
  LOGOUT = 'LOGOUT',
  USER_ACTED_TRUE = 'USER_ACTED_TRUE',
  USER_ACTED_FALSE = 'USER_ACTED_FALSE',
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',
  REMOVE_PROFILE_ERROR = 'REMOVE_PROFILE_ERROR'
}

export interface UserActedActions {
  type:
    | ActionsTypes.USER_ACTED_TRUE
    | ActionsTypes.USER_ACTED_FALSE
    | ActionsTypes.ACCOUNT_DELETED
}

export interface LoadProfileAction {
  type: ActionsTypes.LOAD_PROFILE
}

export interface ProfileLoadedAction {
  type: ActionsTypes.PROFILE_LOADED
  payload: User
}

export interface ProfileErrorAction {
  type: ActionsTypes.PROFILE_ERROR
  payload: Error
}

export interface RemoveProfileError {
  type: ActionsTypes.REMOVE_PROFILE_ERROR
}

export interface LogoutAction {
  type: ActionsTypes.LOGOUT
}

export type ProfileActions =
  | LoadProfileAction
  | ProfileLoadedAction
  | ProfileErrorAction
  | LogoutAction
  | AccountDeletedAction
  | RemoveProfileError

interface LoadRecipesAction {
  type: ActionsTypes.LOAD_RECIPES
}

interface RecipesLoadedAction {
  type: ActionsTypes.RECIPES_LOADED
  payload: Recipe[]
}

interface RecipesErrorAction {
  type: ActionsTypes.RECIPES_ERROR
  payload: Error
}

export type RecipesActions =
  | LoadRecipesAction
  | RecipesLoadedAction
  | RecipesErrorAction
  | LogoutAction
  | AccountDeletedAction

interface SetAlertAction {
  type: ActionsTypes.SET_ALERT
  payload: AlertState
}

interface RemoveAlertAction {
  type: ActionsTypes.REMOVE_ALERT
}

export interface AccountDeletedAction {
  type: ActionsTypes.ACCOUNT_DELETED
}

export type AlertActions =
  | SetAlertAction
  | RemoveAlertAction
  | AccountDeletedAction

export interface StoreState {
  profile: ProfileState
  recipes: RecipesState
  alert: AlertState | null
  userActed: boolean
}
