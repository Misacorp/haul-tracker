import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ConfirmRegistration from './ConfirmRegistration';
import Login from './Login';
import Register from './Register';
import IdentityResult from './IdentityResult';

/**
 * Allow user to login, register and confirm registration.
 *
 * Three components: Login, Register and ConfirmRegistration.
 *
 * Username (email) and password live in Identity and are passed down to all components as props.
 * This way if a user logs in but is not confirmed, we can simply ask for a confirmation code
 * instead of both the username and confirmation code.
 *
 * isAuthenticated is passed as a prop.
 *
 * Each component handles its own submissions. In case of an error, the result is passed back to
 * Identity. Here we can direct the user to the next step based on what error was received.
 *
 * Example 1: User tries to log in, but the account does not exist. Direct them to Register.
 * Example 2: User tries to log in, but the account is not verified. Direct them to Confirm.
 */

const styles = {
  main: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    textAlign: 'center',
    marginBottom: '1em',
  },
  card: {
    display: 'inline-block',
    borderTop: '4px solid #00BCD4',
    borderRadius: '4px',
    boxShadow: '3px 3px 5px rgba(0,0,0,0.15)',
    backgroundColor: 'white',
    padding: 0,
    textAlign: 'center',
    overflow: 'hidden',
  },
  form: {
    padding: '1em',
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
  confirmationCode: '',
  result: {
    message: null,
    recommendation: '',
    action: '',
    isError: false,
  },
};

class Identity extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    // Bind functions
    this.handleChange = this.handleChange.bind(this);
    this.handleError = this.handleError.bind(this);
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
   * Handle login and registration errors.
   * @param {object} e Cognito error object
   * @param {string} e.code Error code
   * @param {string} e.message Error message
   * @param {string} e.name Error name
   */
  handleError(e) {
    console.error(e);

    let newResult = {
      message: e.message,
      isError: true,
    };

    // Set next action based on error received.
    switch (e.code) {
      case 'UserNotFoundException':
        // User was not found. Get them to the registration page
        newResult = {
          ...newResult,
          recommendation: 'Create an account to start tracking your hauls.',
          action: 'Register',
          onClick: () => {
            this.setState(
              { result: initialState.result },
              () => this.props.history.push('/register'),
            );
          },
        };
        break;
      case 'UserNotConfirmedException':
        // User has signed up but not confirmed their registration
        // Give them a chance to input confirmation code
        newResult = {
          ...newResult,
          recommendation: 'Check your email for a verification code to confirm your registration.',
          action: 'Enter code',
          onClick: () => {
            this.setState(
              { result: initialState.result },
              () => this.props.history.push('/confirm'),
            );
          },
        };
        break;
      case 'CodeMismatchException':
        // Confirmation code was wrong.
        // Cognito's error message is sufficient enough.
        break;
      default:
        // Default case just shows Cognito's error response message as defined above.
        break;
    }

    this.setState({ result: newResult });
  }


  render() {
    // Check if user has already logged in.
    if (this.props.loginState.isAuthenticated) {
      // Play some nice welcome animation or something?
      // Redirect to home
      this.props.history.push('/');
    }

    // Initially render a component based on route.
    switch (this.props.location.pathname) {
      case '/register':
        return (
          <Register
            username={this.state.username}
            password={this.state.password}
            result={this.state.result.message ?
              <IdentityResult result={this.state.result} />
              : null}
            loginState={this.props.loginState}
            styles={styles}
            handleChange={this.handleChange}
            handleError={this.handleError}
          />
        );
      case '/confirm':
        return (
          <ConfirmRegistration
            username={this.state.username}
            confirmationCode={this.state.confirmationCode}
            result={this.state.result.message ?
              <IdentityResult result={this.state.result} />
              : null}
            loginState={this.props.loginState}
            styles={styles}
            handleChange={this.handleChange}
            handleError={this.handleError}
          />
        );
      default:
        return (
          <Login
            username={this.state.username}
            password={this.state.password}
            result={this.state.result.message ?
              <IdentityResult result={this.state.result} />
              : null}
            loginState={this.props.loginState}
            styles={styles}
            history={this.props.history}
            handleChange={this.handleChange}
            handleError={this.handleError}
          />
        );
    }
  }
}

Identity.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  loginState: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    userHasAuthenticated: PropTypes.func,
  }),
};

Identity.defaultProps = {
  location: {
    pathname: '/login',
  },
  history: {
    push: null,
  },
  loginState: {
    isAuthenticated: false,
    userHasAuthenticated: null,
  },
};

export default withRouter(Identity);
