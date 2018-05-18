import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import CircularProgress from 'material-ui/CircularProgress';

import Response from './dataTypes/Response';

const styles = {
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1em 2em',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: '4px',
    borderTop: '4px solid',
    boxShadow: '2px 2px 3px rgba(0,0,0,0.15)',
    backgroundColor: 'white',
  },
  response: {
    borderTopColor: '#74d590',
  },
  error: {
    borderTopColor: '#d58274',
    backgroundColor: '#ffdada',
  },
  waiting: {
    borderTop: 'none',
    padding: '2em',
  },
  waitingMessage: {
    margin: 0,
    padding: 0,
  },
};

function Result(props) {
  // There is an error to display
  if (props.error) {
    return (
      <div style={props.style}>
        <div style={{ ...styles.container, ...styles.error }}>
          {props.error}
        </div>
      </div>
    );
  }

  // There is a result to display.
  if (props.response) {
    const { response } = props;
    return (
      <div style={props.style}>
        <div style={{ ...styles.container, ...styles.response }}>
          {response.status} <br />
          {response.message}
        </div>
      </div>
    );
  }

  // We are waiting.
  if (props.isSending) {
    return (
      <div style={props.style}>
        <div style={{ ...styles.container, ...styles.waiting }}>
          <CircularProgress mode="indeterminate" />
          <p style={styles.waitingMessage}>Sending data...</p>
        </div>
      </div>
    );
  }

  // There is nothing to display.
  return null;
}

Result.propTypes = {
  error: PropTypes.string,
  response: PropTypes.instanceOf(Response),
  style: stylePropType,
  isSending: PropTypes.bool,
};

Result.defaultProps = {
  error: 'Unknown error',
  response: new Response(),
  style: null,
  isSending: false,
};

export default Result;
