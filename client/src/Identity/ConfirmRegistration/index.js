import React from 'react';
import stylePropType from 'react-style-proptype';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

const initialState = {
  isLoading: false,
  newUser: null,
};

class ConfirmRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleConfirmationSubmit = this.handleConfirmationSubmit.bind(this);
  }


  /**
   * Reset error object passed to parent when this component mounts.
   */
  componentWillMount() {
    this.props.handleError(null);
  }


  /**
   * Handle what happens when confirmation code is submitted
   * @param {object} event Form submit event
   */
  async handleConfirmationSubmit(event) {
    event.preventDefault();

    const { username, password, confirmationCode } = this.props;

    // Show loading indicator
    this.setState({ isLoading: true });
    this.props.clearResult();

    try {
      // Confirm registration
      await Auth.confirmSignUp(username, confirmationCode);
      await Auth.signIn(username, password);

      // Update app authentication state and redirect to homepage
      this.props.loginState.userHasAuthenticated(true)
        .then(() => this.props.history.push('/'));
    } catch (e) {
      this.setState({ isLoading: false });
      this.props.handleError(e);
    }
  }


  /**
   * Check if confirmation form is valid
   */
  validateConfirmationForm() {
    return this.props.confirmationCode.length > 0;
  }


  /**
   * Render confirm registration form
   */
  renderConfirmationForm() {
    const { username, confirmationCode, styles } = this.props;
    const { isLoading } = this.state;

    return (
      <div style={styles.main}>
        <div style={styles.card}>
          <div style={styles.form}>
            <h2>Confirm registration</h2>
            <form onSubmit={this.handleConfirmationSubmit} >
              <TextField
                floatingLabelText="Email"
                hintText="An address you can verify"
                name="username"
                value={username}
                onChange={this.props.handleChange}
                style={styles.input}
              />
              <TextField
                floatingLabelText="Confirmation code"
                hintText="Check your email"
                name="confirmationCode"
                value={confirmationCode}
                onChange={this.props.handleChange}
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
          {this.props.result}
        </div>
      </div>
    );
  }


  render() {
    const { styles } = this.props;

    return (
      <div style={styles.main}>
        {this.renderConfirmationForm()}
      </div>
    );
  }
}

ConfirmRegistration.propTypes = {
  username: PropTypes.string,
  confirmationCode: PropTypes.string,
  handleChange: PropTypes.func,
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
  handleError: PropTypes.func,
  result: PropTypes.element,
  clearResult: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  loginState: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    userHasAuthenticated: PropTypes.func,
  }),
};

ConfirmRegistration.defaultProps = {
  username: '',
  confirmationCode: '',
  handleChange: null,
  styles: null,
  handleError: null,
  result: null,
  clearResult: null,
  history: {
    push: null,
  },
  loginState: {
    isAuthenticated: false,
    userHasAuthenticated: null,
  },
};

export default ConfirmRegistration;
