import { combineReducers } from 'redux'
import {
  profileReducer,
  recipesReducer,
  alertReducer,
  StoreState,
  trackReducer
} from '.'

export const rootReducer = combineReducers<StoreState>({
  profile: profileReducer,
  recipes: recipesReducer,
  alert: alertReducer,
  userActed: trackReducer
})
