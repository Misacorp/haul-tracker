import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import Haul from './dataTypes/Haul';
import Voyage from './dataTypes/Voyage';
import Identity from './dataTypes/Identity';

import Story from './Story';
import VoyagePicker from './VoyagePicker';
import HaulPicker from './HaulPicker';
import IdentityInput from './IdentityInput';

const styles = {
  main: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1em',
    backgroundColor: '#F0F0F0',
  },
  state: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1em',
    backgroundColor: 'white',
    borderTop: '4px solid #FFAA00',
    borderRadius: '4px',
    marginTop: '10em',
    maxWidth: '500px',
  },
  submitButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    width: '100%',
    maxWidth: '400px',
    height: '5em',
    marginTop: '2em',
  },
};

// Fresh new state
const initialState = {
  voyage: new Voyage(),
  haul: new Haul(),
  identity: new Identity(),
};

class HaulInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Submits the form.
   */
  handleSubmit() {
    console.log(this.state);
  }

  /**
   * Handles form changes
   * @param {object} obj A partial state
   */
  handleChange(obj) {
    // Get state's properties from incoming change
    const { haul, identity, voyage } = obj;

    // Update state if a value was changed
    const newState = {
      identity: identity ? new Identity(identity) : this.state.identity,
      haul: haul ? new Haul(haul) : this.state.haul,
      voyage: voyage ? new Voyage(voyage) : this.state.voyage,
    };
    this.setState(newState);
  }


  render() {
    const { haul, identity, voyage } = this.state;
    const { goldHoarders, orderOfSouls } = haul;

    return (
      <div style={styles.main}>
        <VoyagePicker voyage={voyage} handleChange={this.handleChange} />
        <HaulPicker haul={haul} company={voyage.company} handleChange={this.handleChange} />
        <IdentityInput identity={identity} handleChange={this.handleChange} />

        <Story voyage={this.state.voyage} haul={this.state.haul} />

        <RaisedButton
          label="Submit haul"
          labelPosition="before"
          primary
          // backgroundColor="#00BCD4"
          style={styles.submitButton}
          buttonStyle={{ lineHeight: '5em' }}
          labelStyle={{ color: 'white', fontWeight: 'bold' }}
          icon={<SendIcon color="white" />}
          onClick={this.handleSubmit}
        />

        <div style={styles.state} >
          <h2>Debug state</h2>
          <p>
            Company: {voyage.company} <br />
            Rank: {voyage.rank}
          </p>

          <Divider />

          {voyage.company === 'goldHoarders' ?
            <p>
              Castaway: {goldHoarders.castaway} <br />
              Seafarer: {goldHoarders.seafarer} <br />
              Marauder: {goldHoarders.marauder} <br />
              Captain: {goldHoarders.captain} <br />
              Thousand Grogs: {goldHoarders.grogs} <br />
              Sorrow: {goldHoarders.sorrow} <br />
            </p>
            :
            <p>
              Foul: {orderOfSouls.foul} <br />
              Disgraced: {orderOfSouls.disgraced} <br />
              Hateful: {orderOfSouls.hateful} <br />
              Villainous: {orderOfSouls.villainous} <br />
            </p>
          }

          <Divider />

          <p>
            Username: {identity.username} <br />
            Password: {identity.password}
          </p>
        </div>
      </div>

    );
  }
}

export default HaulInput;
