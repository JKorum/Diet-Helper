import React, {
  FunctionComponent,
  Fragment,
  useState,
  SyntheticEvent
} from 'react'
import RecipeItem from './Recipe'
import { RecipeModal } from './RecipeModal'

interface RecipesListOwnProps {
  ids: string[] | null
}

export interface RecipeModalData {
  label: string
  source: string
  url: string
  ingredientLines: string[]
  calories: {
    total: number
    perServing: number
    per100g: number
  }
}

export type SetRecipeListState = (data: RecipeModalData) => void

export const RecipesList: FunctionComponent<RecipesListOwnProps> = ({
  ids
}) => {
  const [modalData, setModalData] = useState<RecipeModalData | null>(null)

  const setRecipeListState: SetRecipeListState = data => {
    setModalData(data)
  }

  if (Array.isArray(ids)) {
    if (ids.length > 0) {
      return (
        <Fragment>
          <div className='container-fluid mt-3'>
            <div className='row'>
              {ids.map(id => (
                <div key={id} className='col-sm-6 col-md-4 col-lg-3 px-1 pb-1'>
                  <RecipeItem id={id} handler={setRecipeListState} />
                </div>
              ))}
            </div>
          </div>
          {modalData ? <RecipeModal data={modalData} /> : null}
        </Fragment>
      )
    } else {
      return null
    }
  } else {
    return null
  }
}
