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
  form: {
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
  confirmPassword: '',
  confirmationCode: '',
  isLoading: false,
  newUser: null,
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmationSubmit = this.handleConfirmationSubmit.bind(this);
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

    // Show loading indicator
    this.setState({ isLoading: true });

    // Grab some values from state
    const { username, password } = this.state;

    try {
      // Sign up with AWS Amplify / Cognito
      const newUser = await Auth.signUp({
        username,
        password,
        attributes: {
          email: username,
        },
      });

      // Update state with the returned user object
      console.log(newUser);
      this.setState({
        newUser,
      });
    } catch (e) {
      // Handle an error somehow.
      console.error(e);
    }

    // Remove loading indicator
    this.setState({ isLoading: false });
  }


  /**
   * Handle what happens when confirmation code is submitted
   * @param {object} event Form submit event
   */
  async handleConfirmationSubmit(event) {
    event.preventDefault();

    const { username, password, confirmationCode } = this.state;
    const { props } = this.props; // Destructure props object

    // Show loading indicator
    this.setState({ isLoading: true });

    try {
      // Confirm registration and sign in
      await Auth.confirmSignUp(username, confirmationCode);
      await Auth.signIn(username, password);

      // Update app authentication state and redirect to home
      props.userHasAuthenticated(true);
      props.history.push('/');
    } catch (e) {
      console.error(e);
      this.setState({ isLoading: false });
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
    const { username, password, confirmPassword } = this.state;

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
   * Check if confirmation form is valid
   */
  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }


  /**
   * Render registration form
   */
  renderForm() {
    const {
      username,
      password,
      confirmPassword,
      isLoading,
    } = this.state;

    return (
      <div style={styles.form}>
        <h2>Register</h2>
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
              label="Log In"
              primary
              type="submit"
              disabled={!this.validateForm()}
              style={styles.button}
            />
            {isLoading ? <CircularProgress /> : null}
          </div>
        </form>
      </div>
    );
  }


  /**
   * Render confirm registration form
   */
  renderConfirmationForm() {
    const {
      confirmationCode,
      isLoading,
    } = this.state;

    return (
      <div style={styles.form}>
        <h2>Confirm registration</h2>
        <form onSubmit={this.handleConfirmationSubmit} >
          <TextField
            floatingLabelText="Confirmation code"
            hintText="Check your email"
            name="confirmationCode"
            value={confirmationCode}
            onChange={this.handleChange}
            style={styles.input}
            type="tel"
          />
          <div style={styles.buttonContainer}>
            <RaisedButton
              label="Confirm registration"
              primary
              type="submit"
              disabled={!this.validateConfirmationForm()}
              style={styles.button}
            />
            {isLoading ? <CircularProgress /> : null}
          </div>
        </form>
      </div>
    );
  }


  render() {
    return (
      <div style={styles.main}>
        {this.state.newUser === null ? this.renderForm() : this.renderConfirmationForm()}
      </div>
    );
  }
}

export default Register;
