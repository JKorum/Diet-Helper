import React, { Fragment } from 'react'
import Navigation from './Navigation'
import UnregisterModal from './UnregisterModal'

export const Collection = () => (
  <Fragment>
    <UnregisterModal />
    <Navigation />
    <h1>Recipes Collection (private)</h1>
  </Fragment>
)
