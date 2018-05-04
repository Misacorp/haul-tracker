import React from 'react';
import PropTypes from 'prop-types';
import SizeMe from 'react-sizeme';

import TreasureInput from './TreasureInput';
import Haul from '../dataTypes/Haul';

import Castaway from './assets/img/castaway.png';
import Seafarer from './assets/img/seafarer.png';
import Marauder from './assets/img/marauder.png';

const styles = {
  main: {
    borderTop: '4px solid #00BCD4',
    borderRadius: '4px',
    boxShadow: '3px 3px 5px rgba(0,0,0,0.15)',
    backgroundColor: 'white',
    padding: '1em',
    marginBottom: '1em',
  },
  center: {
    textAlign: 'center',
  },
};

/**
 * Display different chests and inputs to control their amounts.
 * @param {object} props See PropTypes for React component's prop definition
 */
function HaulPicker(props) {
  const { haul, company } = props;
  const { goldHoarders, orderOfSouls } = haul;
  const { width } = props.size;

  // Set colum width on mobile
  let columns = 1;
  if (width > 500) columns = 2;
  if (width > 700) columns = 3;

  // Determine which type of treasure we are inputting based on the given company.
  let treasureInputs = null;
  if (company === 'goldHoarders') {
    // Input chests
    treasureInputs = (
      <div>
        <TreasureInput
          image={Castaway}
          text="Castaway&#39;s chest"
          count={haul.goldHoarders.castaway}
          columns={columns}
          handleChange={newCount => props.handleChange({
            haul: { ...haul, goldHoarders: { ...goldHoarders, castaway: newCount } },
          })}
        />
        <TreasureInput
          image={Seafarer}
          text="Seafarer&#39;s chest"
          count={haul.goldHoarders.seafarer}
          columns={columns}
          handleChange={newCount => props.handleChange({
            haul: { ...haul, goldHoarders: { ...goldHoarders, seafarer: newCount } },
          })}
        />
        <TreasureInput
          image={Marauder}
          text="Marauder&#39;s chest"
          count={haul.goldHoarders.marauder}
          columns={columns}
          handleChange={newCount => props.handleChange({
            haul: { ...haul, goldHoarders: { ...goldHoarders, marauder: newCount } },
          })}
        />
        <TreasureInput
          text="Captain&#39;s chest"
          count={haul.goldHoarders.captain}
          columns={columns}
          handleChange={newCount => props.handleChange({
            haul: { ...haul, goldHoarders: { ...goldHoarders, captain: newCount } },
          })}
        />
        <TreasureInput
          text="Chest of a Thousand Grogs"
          count={haul.goldHoarders.grogs}
          columns={columns}
          handleChange={newCount => props.handleChange({
            haul: { ...haul, goldHoarders: { ...goldHoarders, grogs: newCount } },
          })}
        />
        <TreasureInput
          text="Chest of Sorrows"
          count={haul.goldHoarders.sorrow}
          columns={columns}
          handleChange={newCount => props.handleChange({
            haul: { ...haul, goldHoarders: { ...goldHoarders, sorrow: newCount } },
          })}
        />
      </div>
    );
  } else if (company === 'orderOfSouls') {
    // Input skulls
    treasureInputs = (
      <div>
        <TreasureInput
          text="Foul Bounty Skull"
          count={haul.orderOfSouls.foul}
          columns={columns}
          handleChange={newCount => props.handleChange({
            haul: { ...haul, orderOfSouls: { ...orderOfSouls, foul: newCount } },
          })}
        />
        <TreasureInput
          text="Disgraced Bounty Skull"
          count={haul.orderOfSouls.disgraced}
          columns={columns}
          handleChange={newCount => props.handleChange({
            haul: { ...haul, orderOfSouls: { ...orderOfSouls, disgraced: newCount } },
          })}
        />
        <TreasureInput
          text="Hateful Bounty Skull"
          count={haul.orderOfSouls.hateful}
          columns={columns}
          handleChange={newCount => props.handleChange({
            haul: { ...haul, orderOfSouls: { ...orderOfSouls, hateful: newCount } },
          })}
        />
        <TreasureInput
          text="Villainous Bounty Skull"
          count={haul.orderOfSouls.villainous}
          columns={columns}
          handleChange={newCount => props.handleChange({
            haul: { ...haul, orderOfSouls: { ...orderOfSouls, villainous: newCount } },
          })}
        />
      </div>
    );
  }

  return (
    <div style={styles.main} >
      <h2 style={styles.center}>Haul</h2>

      {treasureInputs}
    </div>
  );
}

HaulPicker.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number,
  }),
  handleChange: PropTypes.func,
  haul: PropTypes.instanceOf(Haul),
  company: PropTypes.string,
};

HaulPicker.defaultProps = {
  size: PropTypes.shape({
    width: 0,
  }),
  handleChange: () => console.log('Chest amount changed'),
  haul: new Haul(),
  company: 'goldHoarders',
};

export default SizeMe()(HaulPicker);
