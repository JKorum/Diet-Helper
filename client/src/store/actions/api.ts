import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { ActionsTypes, RecipesActions, StoreState, Recipe } from '../reducers'

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
      const response = await axios.get(`/api/recipes?${query}&from=${from}`)
      if (response.status === 200) {
        if (successive) {
          // add recipes to existed
        } else {
          // rewrite fetched in state
        }
        // generate id to recipes
      }
    } catch (err) {
      //
    }
  }
}
