import React, { FunctionComponent, Fragment } from 'react'
import CollectedRecipe from './CollectedRecipe'

interface CollectionListOwnProps {
  ids: string[]
}

export const CollectionList: FunctionComponent<CollectionListOwnProps> = ({
  ids
}) => {
  if (ids.length > 0) {
    return (
      <div className='container mt-3'>
        <div className='row justify-content-center'>
          {ids.map(id => (
            <Fragment key={id}>
              <div className='col-md-8 col-lg-6'>
                <CollectedRecipe id={id} />
              </div>
              <div className='col-12'></div>
            </Fragment>
          ))}
        </div>
      </div>
    )
  } else {
    return null
  }
}
