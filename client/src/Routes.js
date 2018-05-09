import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import HaulInput from './HaulInput';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/newhaul" exact component={HaulInput} />
    </Switch>
  );
}

export default Routes;
