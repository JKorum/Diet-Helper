import React, { FunctionComponent, SyntheticEvent, useEffect } from 'react'
import uuid from 'uuid/v1'
import { connect, MapStateToProps } from 'react-redux'
import { StoreState } from '../../store/reducers'
import { deleteCollectionItem } from '../../store/actions'

interface CollectedRecipeOwnProps {
  id: string
}

interface CollectedRecipeConnectedProps {
  id: string
  label: string
  image: string
  url: string
  calTotal: number
  calPerServing: number
  calPer100g: number
  ingredientLines: string[]
  dispatch?: Function
}

const CollectedRecipe: FunctionComponent<CollectedRecipeConnectedProps> = ({
  id,
  label,
  image,
  url,
  calTotal,
  calPerServing,
  calPer100g,
  ingredientLines,
  dispatch
}) => {
  const titleId = uuid()
  const overviewId = uuid()
  const overviewIdData = uuid()
  const titleIdData = uuid()
  const imgFixedId = uuid()
  const cardId = uuid()
  let initialBackgroundSize: string

  if (window.innerWidth > 992) {
    initialBackgroundSize = '50%'
  } else {
    initialBackgroundSize = '100%'
  }

  useEffect(() => {
    const handler = () => {
      const imgFixed = document.getElementById(imgFixedId)
      if (imgFixed) {
        if (window.innerWidth > 992) {
          imgFixed.style.backgroundSize = '50%'
        }

        if (window.innerWidth < 992) {
          imgFixed.style.backgroundSize = '100%'
        }
      }
    }

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  const handleClick = (e: SyntheticEvent) => {
    const target = e.target as HTMLButtonElement
    if (target.name === 'title') {
      const overview = document.getElementById(overviewId)
      if (overview) {
        if (!target.classList.contains('active-custom')) {
          target.classList.add('active-custom')
          overview.classList.remove('active-custom')

          const overviewData = document.getElementById(overviewIdData)
          const titleData = document.getElementById(titleIdData)
          if (overviewData && titleData) {
            titleData.style.display = 'block'
            overviewData.style.display = 'none'
          }
        }
      }
    } else if (target.name === 'overview') {
      const title = document.getElementById(titleId)
      if (title) {
        if (!target.classList.contains('active-custom')) {
          target.classList.add('active-custom')
          title.classList.remove('active-custom')

          const overviewData = document.getElementById(overviewIdData)
          const titleData = document.getElementById(titleIdData)
          if (overviewData && titleData) {
            overviewData.style.display = 'block'
            titleData.style.display = 'none'
          }
        }
      }
    }
  }

  const handleDelete = (e: SyntheticEvent) => {
    const card = document.getElementById(cardId)
    if (dispatch && card) {
      dispatch(deleteCollectionItem(id))
      card.classList.add('fadeOutLeftBig')
    }
  }

  if (!id) {
    return null
  } else {
    return (
      <div id={cardId} className='card mb-3 animated'>
        <div className='card-header'>
          <button
            id={titleId}
            name='title'
            className='btn btn-link btn-sm mr-1 text-decoration-none active-custom'
            onClick={handleClick}
          >
            Title
          </button>
          <button
            id={overviewId}
            name='overview'
            className='btn btn-link btn-sm text-decoration-none'
            onClick={handleClick}
          >
            Overview
          </button>
        </div>
        <div
          id={overviewIdData}
          className='card-body'
          style={{ display: 'none' }}
        >
          <table className='table table-striped table-borderless'>
            <tbody>
              {ingredientLines.length > 0 &&
                ingredientLines.map((line, index) => (
                  <tr key={index}>
                    <td>{line}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <small className='text-muted'>
            Calories: {calTotal} total, {calPerServing} per serving,{' '}
            {calPer100g} per 100g
          </small>
        </div>

        <div id={titleIdData} className='card-body p-0'>
          <div
            id={imgFixedId}
            style={{
              background: `url(${image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: initialBackgroundSize,
              backgroundOrigin: 'border-box',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center'
            }}
          >
            <div className='row'>
              <div className='col'>
                <div
                  className='card-body bg-white'
                  style={{ marginTop: '6rem' }}
                >
                  <h1 className='card-title display-4 m-0'>{label}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='card-footer'>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-outline-primary btn-sm mr-1'
          >
            Instructions <i className='fas fa-external-link-alt fa-sm'></i>
          </a>
          <button
            type='button'
            className='btn btn-outline-primary btn-sm'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<
  CollectedRecipeConnectedProps,
  CollectedRecipeOwnProps,
  StoreState
> = ({ profile: { user } }, { id }) => {
  try {
    if (user) {
      if (user.recipes.length > 0) {
        const recipe = user.recipes.find(recipe => recipe._id === id)
        if (recipe) {
          return {
            id: recipe._id,
            label: recipe.label,
            image: recipe.image,
            url: recipe.url,
            calTotal: Math.round(recipe.calories),
            calPerServing: Math.round(recipe.calories / recipe.yield),
            calPer100g: Math.round(
              (recipe.calories * 100) / recipe.totalWeight
            ),
            ingredientLines: recipe.ingredientLines
          }
        } else {
          throw new Error()
        }
      } else {
        throw new Error()
      }
    } else {
      throw new Error()
    }
  } catch (err) {
    return {
      id: '',
      label: '',
      image: '',
      url: '',
      calTotal: 0,
      calPerServing: 0,
      calPer100g: 0,
      ingredientLines: []
    }
  }
}

export default connect(mapStateToProps)(CollectedRecipe)
