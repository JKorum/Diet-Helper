import React, { Fragment } from 'react'
import Navigation from './Navigation'
import UnregisterModal from './UnregisterModal'

export const SearchRecipes = () => (
  <Fragment>
    <UnregisterModal />
    <Navigation />
    <h1>Search Recipes (private)</h1>
  </Fragment>
)
