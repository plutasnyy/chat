import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import { App } from './components/App';
import example from './components/example';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/frontend/index/" component={App}>
    <IndexRoute component={App} />
    <Route path="/some/where" component={example} />
  </Route>
);