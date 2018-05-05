import React from 'react';
import PropTypes from 'prop-types';

import Voyage from './dataTypes/Voyage';
import Haul from './dataTypes/Haul';

const styles = {
  main: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  strong: {
    color: '#00BCD4',
    fontWeight: 'bold',
  },
};

function Story(props) {
  const { voyage, haul } = props;
  const companyName = voyage.getCompanyName();

  // Do we prefix the company name with 'a' or 'an'.
  let article = 'a';
  if (companyName === 'Order of Souls') article = 'an';

  // What action describes obtaining the treasure
  let action = 'dug up';
  if (companyName === 'Order of Souls') action = 'killed captains that dropped';

  // What treasure was found
  let treasures = Object.entries(haul[voyage.company]);
  // Only deal with treasures that there are over 0 of.
  treasures = treasures.filter((item) => {
    const amount = item[1];
    return amount > 0;
  });

  // Create elements of each treasure.
  const treasureLog = [];
  treasures.forEach((item, index) => {
    const type = item[0];
    const amount = item[1];

    // Get real name of treasure.
    const name = Haul.getRealName(type, amount !== 1);

    // End element with a comma, 'and' or nothing depending on its place in the array.
    let end = '';
    if (index < treasures.length - 2) end = ', ';
    if (index === treasures.length - 2) end = ' and ';

    // Add element to array of treasure elements.
    treasureLog.push((
      <span key={type}>
        <br />
        <span style={styles.strong}>{amount} {name}</span>{end}
      </span>
    ));
  });

  return (
    <div style={styles.main}>
      <h2>My story</h2>
      <p>
        I went on {article} <span style={styles.strong}>{voyage.getCompanyName()}</span> voyage
        of <span style={styles.strong}>rank {voyage.rank}</span>. I {action} {treasureLog.length > 0 ? treasureLog : 'nothing'}.
      </p>
    </div>
  );
}

Story.propTypes = {
  voyage: PropTypes.instanceOf(Voyage),
  haul: PropTypes.instanceOf(Haul),
};

Story.defaultProps = {
  voyage: new Voyage(),
  haul: new Haul(),
};

export default Story;
