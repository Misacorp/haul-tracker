import React from 'react';
import PropTypes from 'prop-types';

import CompanyPicker from './CompanyPicker';
import RankPicker from './RankPicker';

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
 * Handles changing of voyage details; the trading company and the voyage's rank.
 * @param {obj} props Component props
 * @param {obj} props.voyage Voyage object
 * @param {string} props.voyage.company Trading company the voyage is for
 * @param {number} props.voyage.company Voyage rank
 */
function VoyagePicker(props) {
  const { voyage } = props;

  return (
    <div style={styles.main}>
      <h2 style={styles.center}>Voyage</h2>

      <CompanyPicker
        company={voyage.company}
        handleChange={(event, value) => {
          props.handleChange({
            voyage: {
              company: value, // Update company value
              rank: voyage.rank, // Keep rank the same
            },
          });
        }}
      />

      <RankPicker
        rank={voyage.rank}
        company={voyage.company}
        handleChange={(event, value) => {
          props.handleChange({
            voyage: {
              company: voyage.company, // Keep company the same
              rank: value, // Update rank
            },
          });
        }}
      />
    </div>
  );
}

VoyagePicker.propTypes = {
  voyage: PropTypes.shape({
    company: PropTypes.string,
    rank: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

VoyagePicker.defaultProps = {
  voyage: {
    company: 'Gold Hoarders',
    rank: 0,
  },
  handleChange: () => console.log('Voyage value changed'),
};

export default VoyagePicker;
