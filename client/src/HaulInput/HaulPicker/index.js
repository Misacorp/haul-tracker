import React from 'react';
import PropTypes from 'prop-types';
import SizeMe from 'react-sizeme';

import ChestInput from './ChestInput';

import Castaway from './assets/img/castaway.png';
import Seafarer from './assets/img/seafarer.png';
import Marauder from './assets/img/marauder.png';

const styles = {
  main: {
    borderTop: '4px solid #F63',
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
  const { haul } = props;
  const { width } = props.size;

  // Set colum width on mobile
  let columns = 1;
  if (width > 500) columns = 2;
  if (width > 700) columns = 3;

  return (
    <div style={styles.main} >
      <h2 style={styles.center}>Haul</h2>

      <ChestInput
        image={Castaway}
        text="Castaway&#39;s chest"
        count={haul.castaway}
        columns={columns}
        handleChange={newCount => props.handleChange({ haul: { ...haul, castaway: newCount } })}
      />
      <ChestInput
        image={Seafarer}
        text="Seafarer&#39;s chest"
        count={haul.seafarer}
        columns={columns}
        handleChange={newCount => props.handleChange({ haul: { ...haul, seafarer: newCount } })}
      />
      <ChestInput
        image={Marauder}
        text="Marauder&#39;s chest"
        count={haul.marauder}
        columns={columns}
        handleChange={newCount => props.handleChange({ haul: { ...haul, marauder: newCount } })}
      />
      <ChestInput
        text="Captain&#39;s chest"
        count={haul.captain}
        columns={columns}
        handleChange={newCount => props.handleChange({ haul: { ...haul, captain: newCount } })}
      />
      <ChestInput
        text="Chest of a Thousand Grogs"
        count={haul.grogs}
        columns={columns}
        handleChange={newCount => props.handleChange({ haul: { ...haul, grogs: newCount } })}
      />
      <ChestInput
        text="Captain&#39;s chest"
        count={haul.sorrow}
        columns={columns}
        handleChange={newCount => props.handleChange({ haul: { ...haul, sorrow: newCount } })}
      />
    </div>
  );
}

HaulPicker.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number,
  }),
  handleChange: PropTypes.func,
  haul: PropTypes.shape({
    castaway: PropTypes.number,
    seafarer: PropTypes.number,
    marauder: PropTypes.number,
    captain: PropTypes.number,
    sorrow: PropTypes.number,
    grogs: PropTypes.number,
  }),
};

HaulPicker.defaultProps = {
  size: PropTypes.shape({
    width: 0,
  }),
  handleChange: () => console.log('Chest amount changed'),
  haul: PropTypes.shape({
    castaway: 0,
    seafarer: 0,
    marauder: 0,
    captain: 0,
    sorrow: 0,
    grogs: 0,
  }),
};

export default SizeMe()(HaulPicker);
