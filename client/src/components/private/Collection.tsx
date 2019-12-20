import React, {
  Fragment,
  FunctionComponent,
  useState,
  useEffect,
  SyntheticEvent
} from 'react'
import Navigation from '../helpers/Navigation'
import UnregisterModal from '../modals/UnregisterModal'
import { CollectionList } from './CollectionList'
import Alert from '../helpers/Alert'
import CollectionModal from '../modals/CollectionModal'
import { connect, MapStateToProps } from 'react-redux'
import { StoreState } from '../../store/reducers'

interface CollectionOwnProps {}

interface CollectionConnectedProps {
  recipesData: RecipeData[] | null
}

type RecipeData = { id: string; ingr: string[] }

const recipesFilter = (data: RecipeData[] | null, input: string): string[] => {
  if (data) {
    if (data.length > 0) {
      if (input) {
        /* input provided -> filter ids */
        const normalized = input
          .toLowerCase()
          .split(' ')
          .map(ingr => ingr.trim())

        const filtered = data.filter(item => {
          const ingredients = item.ingr.join('').toLowerCase()
          return normalized.every(ingr => ingredients.includes(ingr))
        })

        if (filtered.length > 0) {
          return filtered.map(recipe => recipe.id)
        } else {
          return []
        }
      } else {
        /* no input provided -> return all ids */
        return data.map(recipe => recipe.id)
      }
    } else {
      return []
    }
  } else {
    return []
  }
}

const Collection: FunctionComponent<CollectionConnectedProps> = ({
  recipesData
}) => {
  const [input, setInput] = useState('')

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setInput(target.value)
  }

  return (
    <Fragment>
      <CollectionModal />
      <UnregisterModal />
      <Navigation />
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-6'>
            <h1 className='display-3 mt-5'>Gathered recipes</h1>
            <hr className='my-3' />
            <form>
              <div className='input-group input-group-lg'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search by ingredients'
                  aria-label='Recipes search bar'
                  onChange={handleChange}
                  value={input}
                />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <i className='fas fa-search'></i>
                  </div>
                </div>
              </div>
              <small className='form-text text-muted mb-2'>
                Please, separate the ingredients with spaces.
              </small>
              <button
                className='btn btn-outline-primary btn-sm'
                type='button'
                data-toggle='modal'
                data-target='#collectionModal'
              >
                Delete collection
              </button>
            </form>
          </div>
        </div>
      </div>
      <CollectionList ids={recipesFilter(recipesData, input)} />
      <Alert />
    </Fragment>
  )
}

const mapStateToProps: MapStateToProps<
  CollectionConnectedProps,
  CollectionOwnProps,
  StoreState
> = ({ profile: { user } }) => {
  if (user) {
    if (user.recipes.length > 0) {
      return {
        recipesData: user.recipes.map(recipe => {
          return { id: recipe._id, ingr: recipe.ingredientLines }
        })
      }
    } else {
      return {
        recipesData: null
      }
    }
  } else {
    return {
      recipesData: null
    }
  }
}

export default connect(mapStateToProps)(Collection)
