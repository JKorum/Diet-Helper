import React, { FunctionComponent, SyntheticEvent } from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { StoreState, Recipe } from '../store/reducers'
import { RecipeModalData, SetRecipeListState } from './RecipesList'

interface RecipeOwnProps {
  id: string
  handler?: SetRecipeListState
}

interface RecipeConnectedProps {
  recipe: Recipe | undefined
  handler?: SetRecipeListState
}

const RecipeItem: FunctionComponent<RecipeConnectedProps> = ({
  recipe,
  handler
}) => {
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
      }
    }

    const handleClick = (e: SyntheticEvent) => {
      if (handler) {
        handler(data)
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
                <td>Kcal per serving</td>
                <td>{data.calories.perServing}</td>
              </tr>
              <tr>
                <td>Kcal per 100g</td>
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
          <button className='btn btn-outline-primary btn-sm mb-1'>
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
> = ({ recipes: { fetched } }, { id }) => {
  if (Array.isArray(fetched)) {
    return {
      recipe: fetched.find(recipe => recipe.clientSideId === id)
    }
  } else {
    return {
      recipe: undefined
    }
  }
}

export default connect(mapStateToProps)(RecipeItem)
