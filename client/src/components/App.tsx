import React, { FunctionComponent, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateRoute from './PrivateRoute'
import SearchRecipes from './private/SearchRecipes'
import RecipeAnalysis from './private/RecipeAnalysis'
import { Collection } from './private/Collection'
import ChangeCredentials from './private/ChangeCredentials'
import Landing from './public/Landing'
import Login from './public/Login'
import Register from './public/Register'

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
