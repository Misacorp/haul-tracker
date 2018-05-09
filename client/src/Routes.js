import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import ConfirmRegistration from './ConfirmRegistration';
import HaulInput from './HaulInput';
import NotFound from './NotFound';

function Routes(props) {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => <Home props={props.childProps} />}
      />
      <Route
        path="/login"
        exact
        render={() => <Login props={props.childProps} />}
      />
      <Route
        path="/register"
        exact
        render={() => <Register props={props.childProps} />}
      />
      <Route
        path="/confirm"
        exact
        render={() => <ConfirmRegistration props={props.childProps} />}
      />
      <Route
        path="/newhaul"
        exact
        render={() => <HaulInput props={props.childProps} />}
      />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = {
  childProps: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    userHasAuthenticated: PropTypes.func,
  }),
};

Routes.defaultProps = {
  childProps: {
    isAuthenticated: false,
    userHasAuthenticated: () => false,
  },
};

export default Routes;
