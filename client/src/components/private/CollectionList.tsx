import React, { FunctionComponent, Fragment } from 'react'
import CollectedRecipe from './CollectedRecipe'
import { connect, MapStateToProps } from 'react-redux'
import { StoreState } from '../../store/reducers'

interface CollectionListConnectedProps {
  listOfIds: string[]
}

interface CollectionListOwnProps {}

const CollectionList: FunctionComponent<CollectionListConnectedProps> = ({
  listOfIds
}) => {
  if (listOfIds.length > 0) {
    return (
      <div className='container mt-3'>
        <div className='row justify-content-center'>
          {listOfIds.map(id => (
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

const mapStateToProps: MapStateToProps<
  CollectionListConnectedProps,
  CollectionListOwnProps,
  StoreState
> = ({ profile: { user } }) => {
  if (user) {
    if (user.recipes.length > 0) {
      return {
        listOfIds: user.recipes.map(recipe => recipe._id)
      }
    } else {
      return {
        listOfIds: []
      }
    }
  } else {
    return {
      listOfIds: []
    }
  }
}

export default connect(mapStateToProps)(CollectionList)
