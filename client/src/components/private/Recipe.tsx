import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { StoreState, Recipe, ActionsTypes } from '../../store/reducers'
import { RecipeModalData, SetRecipeListState } from './RecipesList'
import { saveCollectionItem } from '../../store/actions'

interface RecipeOwnProps {
  id: string
  handler?: SetRecipeListState
}

interface RecipeConnectedProps {
  recipe: Recipe | undefined
  titlesFromCollection: string[]
  handler?: SetRecipeListState
  dispatch?: Function
}

const RecipeItem: FunctionComponent<RecipeConnectedProps> = ({
  titlesFromCollection,
  recipe,
  handler,
  dispatch
}) => {
  const [loading, setLoading] = useState(false)

  if (recipe) {
    const data: RecipeModalData = {
      label: recipe.label,
      source: recipe.source,
      url: recipe.url,
      ingredientLines: recipe.ingredientLines,
      calories: {
        total: Math.round(recipe.calories),
        perServing: Math.round(recipe.calories / recipe.yield),
        per100g: Math.round((recipe.calories * 100) / recipe.totalWeight)
      },
      recipeToSave: recipe
    }

    const handleClick = (e: SyntheticEvent) => {
      if (handler) {
        handler(data)
      }
    }

    const handleSaveRecipe = async (e: SyntheticEvent) => {
      if (dispatch) {
        setLoading(true)
        /* the recipe is already in collection? */
        if (!titlesFromCollection.includes(data.label.toLowerCase())) {
          /* no -> proceed */
          await dispatch(saveCollectionItem(recipe, false))
          setLoading(false)
        } else {
          /* yes -> stop */
          setLoading(false)
          dispatch({
            type: ActionsTypes.SET_ALERT,
            payload: {
              text: 'The recipe is already in the collection.',
              color: 'light'
            }
          })
        }
      }
    }

    return (
      <div className='card h-100 animated fadeIn'>
        <img src={recipe.image} className='card-img-top' />
        <div className='card-body'>
          <h4 className='card-title'>{data.label}</h4>
          <table className='table table-sm'>
            <tbody>
              <tr>
                <td className='border-top-0'>Total kcal</td>
                <td className='border-top-0'>{data.calories.total}</td>
              </tr>
              <tr>
                <td>per serving</td>
                <td>{data.calories.perServing}</td>
              </tr>
              <tr>
                <td>per 100g</td>
                <td>{data.calories.per100g}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='card-footer'>
          <button
            className='btn btn-outline-primary btn-sm mr-1 mb-1'
            data-toggle='modal'
            data-target='#recipeModal'
            onClick={handleClick}
          >
            Learn More
          </button>
          <button
            className='btn btn-outline-primary btn-sm mb-1'
            onClick={handleSaveRecipe}
          >
            <span
              className='spinner-border spinner-border-sm align-middle'
              role='status'
              aria-hidden='true'
              style={
                loading ? { display: 'inline-block' } : { display: 'none' }
              }
            ></span>{' '}
            Add To Collection
          </button>
        </div>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps: MapStateToProps<
  RecipeConnectedProps,
  RecipeOwnProps,
  StoreState
> = ({ profile: { user }, recipes: { fetched } }, { id }) => {
  if (Array.isArray(fetched) && user) {
    let titlesFromCollection: string[] = []
    if (user.recipes.length > 0) {
      titlesFromCollection = user.recipes.map(recipe =>
        recipe.label.toLowerCase()
      )
    }
    return {
      titlesFromCollection,
      recipe: fetched.find(recipe => recipe.clientSideId === id)
    }
  } else {
    return {
      titlesFromCollection: [],
      recipe: undefined
    }
  }
}

export default connect(mapStateToProps)(RecipeItem)
