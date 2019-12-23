import React, {
  FunctionComponent,
  useState,
  SyntheticEvent,
  useEffect
} from 'react'
import { RecipeModalData } from '../private/RecipesList'
import { connect, MapStateToProps } from 'react-redux'
import { StoreState, ActionsTypes, Error } from '../../store/reducers'
import { saveCollectionItem } from '../../store/actions'

interface RecipeModalOwnProps {
  data: RecipeModalData
}

interface RecipeModalConnectedProps extends RecipeModalOwnProps {
  dispatch?: Function
  titlesFromCollection: string[]
  error: Error | null
}

const RecipeModal: FunctionComponent<RecipeModalConnectedProps> = ({
  data,
  dispatch,
  titlesFromCollection,
  error
}) => {
  const [loading, setLoading] = useState(false)
  const [addBtnStatus, setAddBtnStatus] = useState('Collect')

  const handleSaveRecipe = async (e: SyntheticEvent) => {
    if (dispatch) {
      setLoading(true)
      /* the recipe is already in collection? */
      if (!titlesFromCollection.includes(data.label.toLowerCase())) {
        /* no -> proceed */
        await dispatch(saveCollectionItem(data.recipeToSave, true))
        setLoading(false)
        setAddBtnStatus('Added')
      } else {
        /* yes -> stop */
        setLoading(false)
        setAddBtnStatus('Already collected')
      }
    }
  }

  /* setting button state to default & clean up profile error */
  useEffect(() => {
    const $modal = document.getElementById('recipeModal')

    if ($modal) {
      const callback = function(
        mutationList: MutationRecord[],
        observer: MutationObserver
      ) {
        for (let mutation of mutationList) {
          const element = mutation.target as HTMLElement
          const attrMap = element.attributes

          const styleAttr = attrMap.getNamedItem('style')
          if (styleAttr) {
            if (styleAttr.value.includes('display: none;')) {
              setAddBtnStatus('Add To Collection')

              if (error && dispatch) {
                dispatch({
                  type: ActionsTypes.REMOVE_PROFILE_ERROR
                })
              }
            }
          }
        }
      }

      const config: MutationObserverInit = {
        attributes: true,
        attributeFilter: ['style']
      }
      const observer = new MutationObserver(callback)
      observer.observe($modal, config)

      return () => {
        observer.disconnect()
      }
    }
  })

  return (
    <div
      className='modal fade'
      id='recipeModal'
      tabIndex={-1}
      role='dialog'
      aria-labelledby='recipeModalTitle'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='recipeModalTitle'>
              {data.label}
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <p className='lead'>
              <span className='badge badge-primary font-weight-normal'>
                kcal
              </span>{' '}
              <span className='badge badge-primary font-weight-normal'>
                {data.calories.total} total
              </span>{' '}
              <span className='badge badge-primary font-weight-normal'>
                {data.calories.perServing} per serving
              </span>{' '}
              <span className='badge badge-primary font-weight-normal'>
                {data.calories.per100g} per 100g
              </span>
            </p>
            <p>
              {`The recipe was originally published on '${data.source}.' You can
              get to know the cooking instructions by navigating to their`}
              <a
                href={data.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-decoration-none'
              >
                {' '}
                website.
              </a>{' '}
              To follow along, you will need the following:
            </p>

            <table className='table table-sm table-striped'>
              <tbody>
                {data.ingredientLines.length > 0 &&
                  data.ingredientLines.map((line, index) => (
                    <tr key={index}>
                      <td className='border-top-0'>{line}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {error && (
              <div className='alert alert-danger mb-0' role='alert'>
                <strong>Error.</strong> Something went wrong. Please, try again
                later.
              </div>
            )}
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-cool'
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
              <p>{addBtnStatus}</p>
            </button>
            <button
              type='button'
              className='btn btn-cool btn-cool-cancel'
              data-dismiss='modal'
            >
              <p>Cancel</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps: MapStateToProps<
  RecipeModalConnectedProps,
  RecipeModalOwnProps,
  StoreState
> = ({ profile: { user, error } }, { data }) => {
  if (user) {
    if (user.recipes.length > 0) {
      return {
        titlesFromCollection: user.recipes.map(recipe =>
          recipe.label.toLowerCase()
        ),
        data,
        error
      }
    } else {
      return {
        titlesFromCollection: [],
        data,
        error
      }
    }
  } else {
    return {
      titlesFromCollection: [],
      data,
      error
    }
  }
}

export default connect(mapStateToProps)(RecipeModal)
