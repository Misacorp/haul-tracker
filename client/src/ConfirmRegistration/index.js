import React from 'react';
import { Auth } from 'aws-amplify';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
  confirmationCode: '',
  isLoading: false,
  newUser: null,
};

class ConfirmRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmationSubmit = this.handleConfirmationSubmit.bind(this);
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
   * Handle what happens when confirmation code is submitted
   * @param {object} event Form submit event
   */
  async handleConfirmationSubmit(event) {
    event.preventDefault();

    const { username, confirmationCode } = this.state;
    const { props } = this.props; // Destructure props object

    // Show loading indicator
    this.setState({ isLoading: true });

    try {
      // Confirm registration
      await Auth.confirmSignUp(username, confirmationCode);

      // Update app authentication state and redirect to sign in page
      props.userHasAuthenticated(true);
      props.history.push('/login');
    } catch (e) {
      console.error(e);
      this.setState({ isLoading: false });
    }
  }


  /**
   * Check if confirmation form is valid
   */
  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }


  /**
   * Render confirm registration form
   */
  renderConfirmationForm() {
    const {
      username,
      confirmationCode,
      isLoading,
    } = this.state;

    return (
      <div style={styles.form}>
        <h2>Confirm registration</h2>
        <form onSubmit={this.handleConfirmationSubmit} >
          <TextField
            floatingLabelText="Email"
            hintText="An address you can verify"
            name="username"
            value={username}
            onChange={this.handleChange}
            style={styles.input}
          />
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
        {this.renderConfirmationForm()}
      </div>
    );
  }
}

export default ConfirmRegistration;
