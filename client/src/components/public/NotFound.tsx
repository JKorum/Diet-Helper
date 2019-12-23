import React, { FunctionComponent } from 'react'

export const NotFound: FunctionComponent = () => {
  return (
    <div className='background d-flex align-items-center'>
      <div className='flex-grow-1 bg-white'>
        <div className='container'>
          <div className='row justify-content-center py-3'>
            <div className='col-md-6'>
              <h1 className='display-3'>Not Found</h1>
              <hr className='my-3' />
              <p className='lead'>Sorry, the requested page doesn't exist.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
