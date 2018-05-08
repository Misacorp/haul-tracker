import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import HomeIcon from 'material-ui/svg-icons/action/home';

import Routes from './Routes';

const styles = {
  main: {
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  active: {
    borderLeft: '7px solid #00BCD4',
    backgroundColor: '#E0FAFF',
  },
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  handleClose(newPath) {
    // Close drawer
    this.setState({ drawerOpen: false });
    // Navigate to the to prop
    if (this.props.location.pathname !== newPath) {
      this.props.history.push(newPath);
    }
  }

  render() {
    const { pathname } = this.props.location;

    return (
      <MuiThemeProvider>
        <div style={styles.main} >
          <Drawer
            docked={false}
            width={200}
            open={this.state.drawerOpen}
            onRequestChange={drawerOpen => this.setState({ drawerOpen })}
          >
            <MenuItem onClick={() => this.handleClose('/')} style={pathname === '/' ? styles.active : null} >
              Home
            </MenuItem>
            <MenuItem onClick={() => this.handleClose('/newhaul')} style={pathname === '/newhaul' ? styles.active : null}>
              New haul
            </MenuItem>
          </Drawer>

          <AppBar
            title="Haul Tracker"
            onLeftIconButtonClick={this.handleToggle}
            iconElementRight={
              this.props.location.pathname === '/newhaul' ?
                <FlatButton
                  label="Home"
                  secondary
                  icon={<HomeIcon />}
                  onClick={() => this.props.history.push('/')}
                /> :
                <FlatButton
                  label="New Haul"
                  primary
                  icon={<AddIcon />}
                  onClick={() => this.props.history.push('/newhaul')}
                />
            }
          />

          <div style={styles.main}>
            <Routes />
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
