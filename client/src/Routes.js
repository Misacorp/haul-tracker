import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Identity from './Identity';
import HaulInput from './HaulInput';
import NotFound from './NotFound';

function Routes(props) {
  const { loginState } = props;

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => <Home loginState={loginState} />}
      />
      <Route
        path="/login"
        exact
        render={() => <Identity loginState={loginState} />}
      />
      <Route
        path="/register"
        exact
        render={() => <Identity loginState={loginState} />}
      />
      <Route
        path="/confirm"
        exact
        render={() => <Identity loginState={loginState} />}
      />
      <Route
        path="/newhaul"
        exact
        render={() => <HaulInput loginState={loginState} />}
      />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = {
  loginState: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    userHasAuthenticated: PropTypes.func,
  }),
};

Routes.defaultProps = {
  loginState: {
    isAuthenticated: false,
    userHasAuthenticated: () => false,
  },
};

export default Routes;
