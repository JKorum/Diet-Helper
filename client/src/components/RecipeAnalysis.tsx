import React, { Fragment } from 'react'
import Navigation from './Navigation'
import UnregisterModal from './UnregisterModal'

export const RecipeAnalysis = () => (
  <Fragment>
    <UnregisterModal />
    <Navigation />
    <h1>RecipeAnalysis (private)</h1>
  </Fragment>
)
