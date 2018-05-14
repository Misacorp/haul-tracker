import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import { Auth } from 'aws-amplify';
import { validate as validateEmail } from 'email-validator';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

const initialState = {
  isLoading: false,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  /**
   * Reset error object passed to parent when this component mounts.
   */
  componentWillMount() {
    this.props.handleError(null);
  }


  /**
   * Handle submission of the form
   * @param {object} event Form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.props;

    this.setState({ isLoading: true });
    this.props.clearResult();

    try {
      // Sign in with AWS Amplify / Cognito
      await Auth.signIn(username, password);

      // Update app authentication state and redirect to home
      this.props.loginState.userHasAuthenticated(true)
        .then(() => this.props.history.push('/')); // Cannot update during an existing state transition!
    } catch (e) {
      // Pass error to parent component.
      this.setState({ isLoading: false });
      this.props.handleError(e);
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
    const { username, password } = this.props;

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
    const { username, password, styles } = this.props;
    const { isLoading } = this.state;

    return (
      <div style={styles.main}>
        <div style={styles.card}>
          <div style={styles.form}>
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
              <TextField
                floatingLabelText="Email"
                hintText="An address you can verify"
                name="username"
                value={username}
                onChange={this.props.handleChange}
                style={styles.input}
              />
              <TextField
                floatingLabelText="Password"
                hintText="Don't tell anyone!"
                name="password"
                type="password"
                value={password}
                onChange={this.props.handleChange}
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
                  onClick={this.props.resetForm}
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
          {this.props.result}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  handleChange: PropTypes.func,
  handleError: PropTypes.func,
  clearResult: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  styles: PropTypes.shape({
    main: stylePropType,
    form: stylePropType,
    input: stylePropType,
    button: stylePropType,
    reset: PropTypes.shape({
      active: stylePropType,
      disabled: stylePropType,
    }),
  }),
  loginState: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    userHasAuthenticated: PropTypes.func,
  }),
  resetForm: PropTypes.func,
  result: PropTypes.element,
};

Login.defaultProps = {
  username: '',
  password: '',
  handleChange: null,
  handleError: null,
  clearResult: null,
  history: {
    push: null,
  },
  styles: null,
  loginState: {
    isAuthenticated: false,
    userHasAuthenticated: null,
  },
  resetForm: null,
  result: null,
};

export default Login;
