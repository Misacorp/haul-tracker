import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
      <MuiThemeProvider>
        <div style={styles.main} >
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
            onLeftIconButtonClick={this.handleToggle}
            iconElementRight={
              this.props.location.pathname === '/newhaul' ?
                <FlatButton
                  label="Home"
                  icon={<HomeIcon />}
                  onClick={() => this.props.history.push('/')}
                /> :
                <FlatButton
                  label="New Haul"
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

export default withRouter(App);
