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

interface User {
  id: any
  name: string
  email: string
  recipes: Recipe[]
}

interface Error {
  error: string
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
  REMOVE_ALERT = 'REMOVE_ALERT'
}

interface LoadProfileAction {
  type: ActionsTypes.LOAD_PROFILE
}

interface ProfileLoadedAction {
  type: ActionsTypes.PROFILE_LOADED
  payload: User
}

interface ProfileErrorAction {
  type: ActionsTypes.PROFILE_ERROR
  payload: Error
}

export type ProfileActions =
  | LoadProfileAction
  | ProfileLoadedAction
  | ProfileErrorAction

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

interface SetAlertAction {
  type: ActionsTypes.SET_ALERT
  payload: AlertState
}

interface RemoveAlertAction {
  type: ActionsTypes.REMOVE_ALERT
}

export type AlertActions = SetAlertAction | RemoveAlertAction

export interface StoreState {
  profile: ProfileState
  recipes: RecipesState
  alert: AlertState | null
}
