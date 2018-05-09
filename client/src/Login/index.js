import React from 'react';
import { Auth } from 'aws-amplify';
import { validate as validateEmail } from 'email-validator';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  main: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    textAlign: 'center',
  },
  loginForm: {
    display: 'inline-block',
    borderTop: '4px solid #00BCD4',
    borderRadius: '4px',
    boxShadow: '3px 3px 5px rgba(0,0,0,0.15)',
    backgroundColor: 'white',
    padding: '1em',
    marginBottom: '1em',
    textAlign: 'center',
  },
  input: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    marginLeft: '0.25em',
    marginRight: '0.25em',
  },
  reset: {
    active: { color: '#777' },
    disabled: { color: '#AAA' },
  },
};

const initialState = {
  username: '',
  password: '',
  isLoading: false,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  /**
   * Handle changes in text inputs
   * @param {object} event Input change event
   * @param {object} event.target Event target
   * @param {string} event.target.name Identifier of the changed input element
   * @param {string} event.target.value Changed input's new value
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  }


  /**
   * Handle submission of the form
   * @param {object} event Form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { props } = this.props; // Destructure props object

    this.setState({ isLoading: true });

    try {
      // Sign in with AWS Amplify / Cognito
      await Auth.signIn(username, password);

      // Update app authentication state and redirect to home
      props.userHasAuthenticated(true);
      props.history.push('/');
    } catch (e) {
      console.error(e);
      this.setState({ isLoading: false });

      if (e.code === 'UserNotConfirmedException') {
        // User has signed up but not confirmed their registration
        // Give them a chance to input username and confirmation code
        props.history.push('/register');
      }
    }
  }


  /**
   * Resets form to initial state.
   */
  handleReset() {
    this.setState(initialState);
  }


  /**
   * Checks if the form is valid.
   */
  validateForm() {
    const { username, password } = this.state;

    /**
     * Checks a single string's validity.
     * @param {string} value Value to check
     */
    function isValid(value) {
      const MINLENGTH = 4;
      const MAXLENGTH = 20;

      return value.length <= MAXLENGTH && value.length >= MINLENGTH;
    }
    return validateEmail(username) && isValid(password);
  }


  render() {
    const { username, password, isLoading } = this.state;

    return (
      <div style={styles.main}>
        <div style={styles.loginForm}>
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
            <TextField
              floatingLabelText="Email"
              hintText="An address you can verify"
              name="username"
              value={username}
              onChange={this.handleChange}
              style={styles.input}
            />
            <TextField
              floatingLabelText="Password"
              hintText="Don't tell anyone!"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
              style={styles.input}
            />
            <div style={styles.buttonContainer}>
              <FlatButton
                label="Clear"
                type="reset"
                disabled={!(username || password)}
                style={styles.button}
                labelStyle={(username || password) ? styles.reset.active : styles.reset.disabled}
                backgroundColor="#FFFFFF"
                hoverColor="#EEEEEE"
              />
              <RaisedButton
                label="Log In"
                primary
                type="submit"
                disabled={!this.validateForm()}
                style={styles.button}
              />
              {isLoading ? <CircularProgress /> : null }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
