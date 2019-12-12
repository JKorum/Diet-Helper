import React, { FunctionComponent, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateRoute from './PrivateRoute'
import { SearchRecipes } from './SearchRecipes'
import { RecipeAnalysis } from './RecipeAnalysis'
import { Collection } from './Collection'
import { ChangeCredentials } from './ChangeCredentials'
import Landing from './Landing'
import Login from './Login'
import Register from './Register'

import { synchronizer } from '../store/actions'

interface AppConnectedProps {
  dispatch: Function
}

export const App: FunctionComponent<AppConnectedProps> = ({ dispatch }) => {
  useEffect(() => {
    dispatch(synchronizer())
  })

  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path='/'>
          <Landing />
        </Route>
        <Route exact={true} path='/login'>
          <Login />
        </Route>
        <Route exact={true} path='/register'>
          <Register />
        </Route>
        <PrivateRoute path='/search' component={SearchRecipes} />
        <PrivateRoute path='/collection' component={Collection} />
        <PrivateRoute path='/analysis' component={RecipeAnalysis} />
        <PrivateRoute path='/credentials' component={ChangeCredentials} />
        <Route path='*'>
          <h1>Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default connect()(App)
