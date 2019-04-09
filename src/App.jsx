import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Details from './components/Details';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/details/:id" component={Details} />
    </Switch>
  );
}

export default connect()(App);
