import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function RankPicker(props) {
  const { company, rank } = props;

  let ranks;
  if (company === 'gold_hoarders') {
    ranks = [
      'Unranked',
      'Gold Picaroon',
      'Gold Bucko',
      'Gold Swabbie',
      'Gold Hauler',
      'Gold Buccaneer',
      'Gold Seadog',
      'Gold Magnate',
      'Gold Captain',
      'Gold Sovereign',
      'Master Gold Hoarder',
    ];
  } else if (company === 'order_of_souls') {
    ranks = [
      'Unranked',
      'Mystic Follower',
      'Mystic Associate',
      'Mystic Apprentice',
      'Mystic Acolyte',
      'Mystic Mercenary',
      'Mystic Hunter',
      'Mystic Chief',
      'Mystic Captain',
      'Mystic Grandee',
      'Master of the Order',
    ];
  } else {
    ranks = [];
  }

  return (
    <div>
      <SelectField
        floatingLabelText="Voyage rank"
        value={rank}
        onChange={(event, index, value) => props.handleChange(event, value)}
      >
        {ranks.map((item, index) => <MenuItem value={index * 5} primaryText={`${item} (lvl ${index * 5})`} key={item} />)}
      </SelectField>
    </div>
  );
}

RankPicker.propTypes = {
  company: PropTypes.string,
  rank: PropTypes.number,
  handleChange: PropTypes.func,
};

RankPicker.defaultProps = {
  company: 'gold_hoarders',
  rank: 0,
  handleChange: () => console.log('Company picked'),
};

export default RankPicker;
