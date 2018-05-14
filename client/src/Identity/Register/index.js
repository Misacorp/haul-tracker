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
  confirmPassword: '',
  isLoading: false,
  newUser: null,
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
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

    // Show loading indicator
    this.setState({ isLoading: true });
    this.props.clearResult();

    // Grab some values from props
    const { username, password } = this.props;

    try {
      // Sign up with AWS Amplify / Cognito
      await Auth.signUp({
        username,
        password,
        attributes: {
          email: username,
        },
      });
      // Remove loading indicator
      this.setState({ isLoading: false });

      // Go to confirmation
      this.props.history.push('/confirm');
    } catch (e) {
      // Remove loading indicator
      this.setState({ isLoading: false });

      // Pass error to parent component.
      this.props.handleError(e);
    }
  }


  /**
   * Resets form to initial state.
   */
  handleReset() {
    this.setState(initialState);
    this.props.resetForm();
  }


  /**
   * Checks if the form is valid.
   */
  validateForm() {
    const { username, password } = this.props;
    const { confirmPassword } = this.state;

    /**
     * Checks a single string's validity.
     * @param {string} value Value to check
     */
    function isValid(value) {
      const MINLENGTH = 4;
      const MAXLENGTH = 20;

      return value.length <= MAXLENGTH && value.length >= MINLENGTH;
    }
    return validateEmail(username) && isValid(password) && confirmPassword === password;
  }


  /**
   * Render registration form
   */
  renderForm() {
    const { username, password, styles } = this.props;
    const {
      confirmPassword,
      isLoading,
    } = this.state;

    return (
      <div style={styles.main}>
        <div style={styles.card}>
          <div style={styles.form}>
            <h2>Register</h2>
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
              <TextField
                floatingLabelText="Confirm Password"
                hintText="Same as above"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
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
                  label="Register"
                  primary
                  type="submit"
                  disabled={!this.validateForm()}
                  style={styles.button}
                />
                {isLoading ? <CircularProgress /> : null}
              </div>
            </form>
          </div>
          {this.props.result}
        </div>
      </div>
    );
  }


  render() {
    return (
      this.renderForm()
    );
  }
}

Register.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
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
  handleChange: PropTypes.func,
  handleError: PropTypes.func,
  clearResult: PropTypes.func,
  resetForm: PropTypes.func,
  result: PropTypes.element,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Register.defaultProps = {
  username: '',
  password: '',
  styles: null,
  handleChange: null,
  handleError: null,
  clearResult: null,
  resetForm: null,
  result: null,
  history: {
    push: null,
  },
};

export default Register;
