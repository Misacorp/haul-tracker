import React from 'react';

import VoyagePicker from './VoyagePicker';
import HaulPicker from './HaulPicker';
import Identity from './Identity';

const styles = {
  main: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1em',
    backgroundColor: '#F0F0F0',
  },
};

// Fresh new state
const initialState = {
  voyage: {
    company: 'gold_hoarders',
    rank: 0,
  },
  haul: {
    castaway: 0,
    seafarer: 0,
    marauder: 0,
    captain: 0,
    grogs: 0,
    sorrow: 0,
  },
  identity: {
    username: '',
    password: '',
  },
};

class HaulInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(obj) {
    // Get state's properties from incoming change
    const { haul, identity, voyage } = obj;

    // Update state if a value was changed
    const newState = {
      identity: identity || this.state.identity,
      haul: haul || this.state.haul,
      voyage: voyage || this.state.voyage,
    };
    this.setState(newState);
  }

  render() {
    const { haul, identity, voyage } = this.state;

    return (
      <div style={styles.main}>
        <h1>HaulInput</h1>
        <VoyagePicker voyage={voyage} handleChange={this.handleChange} />
        <HaulPicker haul={haul} handleChange={this.handleChange} />
        <Identity identity={identity} handleChange={this.handleChange} />

        <h2>State:</h2>

        <h3>Voyage</h3>
        <p>
          Company: {voyage.company} <br />
          Rank: {voyage.rank}
        </p>

        <h3>Haul</h3>
        <p>
          Castaway: {haul.castaway} <br />
          Seafarer: {haul.seafarer} <br />
          Marauder: {haul.marauder} <br />
          Captain: {haul.captain} <br />
          Thousand Grogs: {haul.grogs} <br />
        </p>

        <h3>Identity</h3>
        <p>
          Username: {identity.username} <br />
          Password: {identity.password}
        </p>
      </div>

    );
  }
}

export default HaulInput;
