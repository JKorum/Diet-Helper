import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import { SearchRecipes } from './SearchRecipes'
import { RecipeAnalysis } from './RecipeAnalysis'
import { Collection } from './Collection'
import { ChangeCredentials } from './ChangeCredentials'

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path='/'>
        <h1>Landing</h1>
      </Route>
      <Route exact={true} path='/login'>
        <h1>Login</h1>
      </Route>
      <Route exact={true} path='/register'>
        <h1>Register</h1>
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
