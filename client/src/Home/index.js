import React from 'react';
import PropTypes from 'prop-types';

import LoginRegister from './LoginRegister';

function Home({ props }) {
  const { isAuthenticated } = props;

  return (
    <div>
      <h1>Haul Tracker</h1>
      <p>Keep your voyages in order and treasures logged.</p>

      {isAuthenticated ? 'You are logged in. Welcome!' : <LoginRegister props={props} />}
    </div>
  );
}

Home.propTypes = {
  props: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    userHasAuthenticated: PropTypes.func,
  }),
};

Home.defaultProps = {
  props: {
    isAuthenticated: false,
    userHasAuthenticated: () => false,
  },
};

export default Home;
