import React from 'react'
import ReactDOM from 'react-dom'
import DataProvider from './DataProvider'
import Table from './Table'

import {Switch, Route} from 'react-router'
import example from './example'
import BrowserRouter from 'react-router-dom/es/BrowserRouter'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/frontend/index' component={example} />
    </Switch>
  </BrowserRouter>
)
ReactDOM.render(
  <App />,
  document.getElementById('app')
)
