import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';

// Material UI components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

// Icons
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import HomeIcon from 'material-ui/svg-icons/action/home';
import LinearProgress from 'material-ui/LinearProgress';
import LoginIcon from 'material-ui/svg-icons/action/input';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import LockIcon from 'material-ui/svg-icons/action/lock';
import OpenLockIcon from 'material-ui/svg-icons/action/lock-open';
import RegisterIcon from 'material-ui/svg-icons/action/assignment';

import Routes from './Routes';

const styles = {
  main: {
    // maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  active: {
    borderLeft: '7px solid #00BCD4',
    backgroundColor: '#E0FAFF',
  },
  divider: {
    marginTop: '1em',
    marginBottom: '1em',
  },
  menuItem: {
    paddingLeft: '16px',
  },
  loginVerifier: {
    backgroundColor: 'rgb(199, 249, 255)',
  },
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      isAuthenticated: false,
      isAuthenticating: true,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.verifySession = this.verifySession.bind(this);
    this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
  }


  /**
   * Check if session is still valid on component mount
   */
  componentDidMount() {
    // Remove this timeout once debugging is done.
    setTimeout(() => this.verifySession(), 4000);
    // this.verifySession();
  }


  /**
   * Check if user has logged in and session is still valid.
   */
  async verifySession() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    } catch (e) {
      if (e !== 'No current user') {
        console.error('Could not verify current user session due to an unknown reason.', e);
      }
    }

    this.setState({ isAuthenticating: false });
  }


  /**
   * Handle drawer toggle.
   */
  handleToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }


  /**
   * Handles drawer closing and optionally redirects to new path.
   * @param {string} newPath Optional route to redirect to.
   */
  handleClose(newPath) {
    // Close drawer
    this.setState({ drawerOpen: false });
    // Navigate to newPath if we're not already there
    if (newPath && this.props.location.pathname !== newPath) {
      this.props.history.push(newPath);
    }
  }


  /**
   * Sets user authentication state
   * @param {boolean} authenticated Is the user authenticated?
   */
  userHasAuthenticated(authenticated) {
    return new Promise((resolve) => {
      this.setState({ isAuthenticated: authenticated }, resolve());
    });
  }


  /**
   * Handle logout
   * @param {boolean} event Logout event
   */
  async handleLogout() {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    this.handleClose('/');
  }


  render() {
    const { pathname } = this.props.location;

    // Auth checking functions for children
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      history: this.props.history,
    };

    let loginDisplay = (
      <p>
        <OpenLockIcon /> Verifying session...
      </p>
    );
    if (this.state.isAuthenticated) {
      loginDisplay = (
        <p>
          <OpenLockIcon /> Logged in
        </p>
      );
    } else if (!this.state.isAuthenticating) {
      loginDisplay = (
        <p>
          <LockIcon /> Not logged in
        </p>
      );
    }

    // Menu partial to render when user is logged out
    const loggedOutMenu = (
      <div>
        <Divider style={styles.divider} />
        <MenuItem
          onClick={() => this.handleClose('/login')}
          style={pathname === '/login' ? styles.active : null}
          rightIcon={<LoginIcon />}
        >
          Login
        </MenuItem>
        <MenuItem
          onClick={() => this.handleClose('/register')}
          style={pathname === '/register' ? styles.active : null}
          rightIcon={<RegisterIcon />}
        >
          Register
        </MenuItem>
      </div>
    );

    // Menu partial to render when user is logged in
    const loggedInMenu = (
      <div>
        <MenuItem
          onClick={() => this.handleClose('/newhaul')}
          style={pathname === '/newhaul' ? styles.active : null}
          rightIcon={<AddIcon />}
        >
            New haul
        </MenuItem>
        <Divider style={styles.divider} />
        <MenuItem
          onClick={() => this.handleLogout()}
          rightIcon={<LogoutIcon />}
        >
          Logout
        </MenuItem>
      </div>
    );

    return (
      <MuiThemeProvider>
        <div style={styles.main} >
          <Drawer
            docked={false}
            width={200}
            open={this.state.drawerOpen}
            onRequestChange={drawerOpen => this.setState({ drawerOpen })}
          >
            <h2 style={styles.menuItem}>Haul Tracker</h2>
            <MenuItem
              onClick={() => this.handleClose('/')}
              style={pathname === '/' ? styles.active : null}
              rightIcon={<HomeIcon />}
            >
              Home
            </MenuItem>

            {this.state.isAuthenticated && !this.state.isAuthenticating ?
              loggedInMenu :
              loggedOutMenu
            }
          </Drawer>

          <AppBar
            title="Haul Tracker"
            onLeftIconButtonClick={this.handleToggle}
            iconElementRight={
              this.state.isAuthenticated ?
                <FlatButton
                  label="New Haul"
                  primary
                  icon={<AddIcon />}
                  onClick={() => this.props.history.push('/newhaul')}
                /> :
                <FlatButton
                  label="Login"
                  secondary
                  icon={<LoginIcon />}
                  onClick={() => this.props.history.push('/login')}
                />
            }
          />

          {
            // The page checks if the user's session is still valid on page load. Show an
            // indeterminate progress bar while this check happens.
            this.state.isAuthenticating ?
              <LinearProgress
                mode="indeterminate"
                style={styles.loginVerifier}
              /> :
              null
          }

          {loginDisplay}

          <div style={styles.main}>
            <Routes loginState={childProps} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

App.defaultProps = {
  history: {
    push: null,
    replace: null,
  },
  location: {
    pathname: '/',
  },
};

export default withRouter(App);
