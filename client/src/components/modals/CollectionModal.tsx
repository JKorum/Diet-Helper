import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { deleteCollection } from '../../store/actions'

interface CollectionModalConnectedProps {
  dispatch: Function
}

const CollectionModal: FunctionComponent<CollectionModalConnectedProps> = ({
  dispatch
}) => {
  const handleDelete = () => {
    if (dispatch) {
      const cards = document.getElementsByClassName('card')
      const length = cards.length
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          cards[i].className = cards[i].className + ' fadeOut'
        }
        dispatch(deleteCollection())
      }
    }
  }

  return (
    <div
      className='modal fade'
      id='collectionModal'
      tabIndex={-1}
      role='dialog'
      aria-labelledby='collectionModalTitle'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='collectionModalTitle'>
              Collection Deletion
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
              If you want to erase all your saved recipes permanently, please
              hit 'Submit.'
            </p>
          </div>

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-cool'
              data-toggle='modal'
              data-target='#collectionModal'
              onClick={handleDelete}
            >
              <p>Submit</p>
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

export default connect()(CollectionModal)
