import React, { Fragment, FunctionComponent } from 'react'
import Navigation from '../helpers/Navigation'
import UnregisterModal from '../modals/UnregisterModal'
import CollectionList from './CollectionList'
import Alert from '../helpers/Alert'
import CollectionModal from '../modals/CollectionModal'

// delete collection btn -> spinner when action in progress // disabled when no recipes
// search btn -> disabled when no recipes OR no input

export const Collection: FunctionComponent = () => (
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
                // onChange={}
                // value={}
              />
              <div className='input-group-append'>
                <button
                  className='btn btn-outline-primary'
                  type='submit'
                  // disabled={}
                >
                  <i className='fas fa-search'></i>
                </button>
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
    <CollectionList />
    <Alert />
  </Fragment>
)
