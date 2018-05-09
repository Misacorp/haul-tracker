import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import HaulInput from './HaulInput';

function Routes(props) {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => <Home props={props.childProps} />}
      />
      <Route
        path="/newhaul"
        exact
        render={() => <HaulInput props={props.childProps} />}
      />
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
