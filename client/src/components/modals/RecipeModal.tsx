import React, { FunctionComponent } from 'react'
import { RecipeModalData } from '../private/RecipesList'

interface RecipeModalOwnProps {
  data: RecipeModalData
}

export const RecipeModal: FunctionComponent<RecipeModalOwnProps> = ({
  data
}) => {
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
            <p>
              <span className='badge badge-dark'>kcal</span>{' '}
              <span className='badge badge-dark'>
                {data.calories.total} total
              </span>{' '}
              <span className='badge badge-dark'>
                {data.calories.perServing} per serving
              </span>{' '}
              <span className='badge badge-dark'>
                {data.calories.per100g} per 100g
              </span>
            </p>
            <p className='lead'>
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
              </a>
            </p>
            <p className='lead'>
              To follow along, you will need the following:
            </p>
            <table className='table table-sm table-hover'>
              <tbody>
                {data.ingredientLines.length > 0 &&
                  data.ingredientLines.map((line, index) => (
                    <tr key={index}>
                      <td className='border-top-0'>{line}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-outline-primary'>
              Add To Collection
            </button>
            <button
              type='button'
              className='btn btn-outline-secondary'
              data-dismiss='modal'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
