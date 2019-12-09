import { combineReducers } from 'redux'
import { profileReducer, recipesReducer, alertReducer, StoreState } from './'

export const rootReducer = combineReducers<StoreState>({
  profile: profileReducer,
  recipes: recipesReducer,
  alert: alertReducer
})
