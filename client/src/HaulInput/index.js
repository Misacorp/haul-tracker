import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import Haul from './dataTypes/Haul';
import Voyage from './dataTypes/Voyage';

import Result from './Result';
import Story from './Story';
import VoyagePicker from './VoyagePicker';
import HaulPicker from './HaulPicker';

import submitHaul from './submitHaul';

const styles = {
  main: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1em',
    backgroundColor: '#F0F0F0',
    maxWidth: '800px',
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
  result: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    textAlign: 'center',
    marginTop: '1em',
  },
};

// Fresh new state
const initialState = {
  voyage: new Voyage(),
  haul: new Haul(),
  error: null,
  response: null,
  isSending: false,
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
    // Clear existing errors and responses. Set sending to true.
    this.setState({
      ...this.state,
      error: null,
      response: null,
      isSending: true,
    });

    // const wrongData = {
    //   ...this.state,
    //   voyage: {
    //     company: 'goldHoarders',
    //     rank: '45',
    //   },
    // };

    const rightData = this.state;

    // Send data to server.
    submitHaul(rightData)
      .then((res) => {
        // Submission was successful.
        // Reset state and display response.
        this.setState({
          ...initialState,
          response: res,
        });
      })
      .catch((e) => {
        // There was an error sending data. Display it.
        this.setState({
          ...this.state,
          error: `Could not send: ${e.message}`,
        });
      })
      .then(() => {
        // Finally remove sending state regardless of outcome
        this.setState({ ...this.state, isSending: false });
      });
  }

  /**
   * Handles form changes
   * @param {object} obj A partial state
   */
  handleChange(obj) {
    // Get state's properties from incoming change
    const { haul, voyage } = obj;

    // Update state if a value was changed
    const newState = {
      ...this.state,
      haul: haul ? new Haul(haul) : this.state.haul,
      voyage: voyage ? new Voyage(voyage) : this.state.voyage,
    };
    this.setState(newState);
  }


  render() {
    const { haul, voyage } = this.state;
    const { goldHoarders, orderOfSouls } = haul;

    return (
      <div style={styles.main}>
        <VoyagePicker voyage={voyage} handleChange={this.handleChange} />
        <HaulPicker haul={haul} company={voyage.company} handleChange={this.handleChange} />

        <Story voyage={this.state.voyage} haul={this.state.haul} />

        <RaisedButton
          label="Submit haul"
          labelPosition="before"
          primary
          disabled={this.state.isSending}
          style={styles.submitButton}
          buttonStyle={{ lineHeight: '5em' }}
          labelStyle={{ color: 'white', fontWeight: 'bold' }}
          icon={<SendIcon color="white" />}
          onClick={this.handleSubmit}
        />

        <Result
          error={this.state.error}
          response={this.state.response}
          isSending={this.state.isSending}
          style={styles.result}
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
        </div>
      </div>

    );
  }
}

export default HaulInput;
