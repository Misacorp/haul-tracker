import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const styles = {
  main: {
    borderTop: '4px solid #00BCD4',
    borderRadius: '4px',
    boxShadow: '3px 3px 5px rgba(0,0,0,0.15)',
    backgroundColor: 'white',
    padding: '1em',
    marginBottom: '1em',
    textAlign: 'center',
  },
  input: {
    marginLeft: '0.25em',
    marginRight: '0.25em',
  },
};

function IdentityInput(props) {
  const { username, password } = props.identity;

  return (
    <div style={styles.main}>
      <h2>Login</h2>

      <TextField
        floatingLabelText="Username"
        hintText="My name is..."
        name="Username"
        value={username}
        onChange={(event, newValue) => {
            props.handleChange({ identity: { ...props.identity, username: newValue } });
        }}
        style={styles.input}
      />
      <TextField
        floatingLabelText="Password"
        hintText="Secret stuff"
        name="Password"
        type="password"
        value={password}
        onChange={(event, newValue) => {
            props.handleChange({ identity: { ...props.identity, password: newValue } });
        }}
        style={styles.input}
      />

      <p>Optional login if you want to keep track of your own hauls.</p>
      <p>
        <strong>Note:</strong> As of now none of this stuff is secured so
        don&#39;t use a password that you use somewhere else.
      </p>
    </div>
  );
}

IdentityInput.propTypes = {
  identity: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  handleChange: PropTypes.func,
};

IdentityInput.defaultProps = {
  identity: {
    username: '',
    password: '',
  },
  handleChange: () => console.log('Identity value changed'),
};

export default IdentityInput;
