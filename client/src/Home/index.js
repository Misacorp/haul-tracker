import React from 'react';
import PropTypes from 'prop-types';

function Home({ props }) {
  const { isAuthenticated } = props;

  const intro = (
    <div>
      <h1>Haul Tracker</h1>
      <p>Keep your voyages in order and treasures logged.</p>
    </div>
  );

  return (
    <div>
      {intro}
      {isAuthenticated ? 'You are logged in. Welcome!' : 'Log in to use Haul Tracker'}
    </div>
  );
}

Home.propTypes = {
  props: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    userHasAuthenticated: PropTypes.func,
  }),
  isAuthenticated: PropTypes.bool,
};

Home.defaultProps = {
  props: {
    isAuthenticated: false,
    userHasAuthenticated: () => false,
  },
  isAuthenticated: false,
};

export default Home;
