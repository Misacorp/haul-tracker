import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Routes from './Routes';

const styles = {
  main: {
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
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

  handleClose() {
    this.setState({ drawerOpen: false });
  }

  render() {
    return (
      <div style={styles.main} >
        <MuiThemeProvider>
          <Drawer
            docked={false}
            width={200}
            open={this.state.drawerOpen}
            onRequestChange={drawerOpen => this.setState({ drawerOpen })}
          >
            <Link to="/">
              <MenuItem to="/" onClick={this.handleClose}>Login</MenuItem>
            </Link>
            <Link to="/newhaul">
              <MenuItem onClick={this.handleClose}>New haul</MenuItem>
            </Link>
          </Drawer>

          <AppBar
            title="Haul Tracker"
            onClick={this.handleToggle}
          />

          <div style={styles.main}>
            <Routes />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
