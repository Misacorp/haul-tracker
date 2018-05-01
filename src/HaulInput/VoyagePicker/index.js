import React from 'react';
import PropTypes from 'prop-types';

function VoyagePicker(props) {
  console.log(props.voyage);

  return (
    <p>VoyagePicker</p>
  );
}

VoyagePicker.propTypes = {
  voyage: PropTypes.shape({
    company: PropTypes.string,
    rank: PropTypes.number,
  }),
};

VoyagePicker.defaultProps = {
  voyage: {
    company: 'Gold Hoarders',
    rank: 0,
  },
};

export default VoyagePicker;
