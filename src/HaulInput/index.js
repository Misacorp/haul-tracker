import React from 'react';

import VoyagePicker from './VoyagePicker';
import HaulPicker from './HaulPicker';
import Identity from './Identity';

// Fresh new state
const newState = {
  voyage: {
    company: 'Gold Hoarders',
    rank: 0,
  },
  haul: {
    castaway: 0,
    seafarer: 0,
    marauder: 0,
    captain: 0,
    sorrow: 0,
    grogs: 0,
  },
};

class HaulInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = newState;
  }

  render() {
    const { haul, voyage } = this.state;

    return (
      <div>
        <h1>HaulInput</h1>
        <VoyagePicker voyage={voyage} />
        <HaulPicker haul={haul} />
        <Identity />
      </div>

    );
  }
}

export default HaulInput;
