import React, { FunctionComponent } from 'react'

export const Spinner: FunctionComponent = () => (
  <div
    id='spinner'
    className='spinner-border text-dark fixed-bottom ml-auto m-2'
    role='status'
  >
    <span className='sr-only'>Loading...</span>
  </div>
)
