import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  result: {
    backgroundColor: '#ffc7c4',
    borderTop: '4px solid #ffa5a0',
    margin: 0,
    padding: '0.5em',
  },
};

function IdentityResult(props) {
  const { result } = props;

  return (
    <div style={styles.result}>
      <p>
        {result.message}<br />
        {result.recommendation}
      </p>
      {result.action ?
        <RaisedButton
          label={result.action}
          primary
          style={styles.button}
          onClick={result.onClick}
        />
      : null }
    </div>
  );
}

IdentityResult.propTypes = {
  result: PropTypes.shape({
    message: PropTypes.string,
    recommendation: PropTypes.string,
    action: PropTypes.string,
    isError: PropTypes.bool,
    onClick: PropTypes.func,
  }),
};

IdentityResult.defaultProps = {
  result: {
    message: null,
    recommendation: '',
    action: 'Continue',
    isError: false,
    onClick: null,
  },
};

export default IdentityResult;
