import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import App from '../App'
import Recipe from './Recipe'

const Router = () => {
    return (
      <BrowserRouter>
          <Switch>
            <Route path='/' component={App} exact />
            <Route path='/recipe/:label' component={Recipe} />
            <Route path='/:label' component={App} />
          </Switch>
      </BrowserRouter>
    );
  }
 
export default Router;