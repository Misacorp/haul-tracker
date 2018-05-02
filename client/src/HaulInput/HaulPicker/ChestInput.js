import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';

import DefaultImage from './assets/img/castaway.png';

/**
 * Display a chest and controls to change its count.
 * @param {object} props See PropTypes for React component's prop definition
 */
function ChestInput(props) {
  const {
    image,
    text,
    columns,
    count,
  } = props;

  // Calculate component width
  const width = `${100 / columns}%`;

  // Define styles
  const styles = {
    container: {
      width,
      display: 'inline-block',
      textAlign: 'center',
      paddingBottom: '1em',
    },
    image: {
      maxWidth: '100px',
    },
    button: {
      marginLeft: '0.25em',
      marginRight: '0.25em',
    },
  };

  return (
    <div style={styles.container}>
      <img src={image} alt={text} style={styles.image} />
      <p>{count} {text}{count > 1 || count === 0 ? 's' : ''}</p>

      <FloatingActionButton
        mini
        style={styles.button}
        onClick={() => props.handleChange(count + 1)}
      >
        <Add />
      </FloatingActionButton>

      <FloatingActionButton
        mini
        style={styles.button}
        onClick={() => props.handleChange(count > 1 ? count - 1 : 0)}
        disabled={count < 1}
      >
        <Remove />
      </FloatingActionButton>
    </div>
  );
}

ChestInput.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  columns: PropTypes.number,
  handleChange: PropTypes.func,
  count: PropTypes.number,
};

ChestInput.defaultProps = {
  image: DefaultImage,
  text: 'Castaway&#39;s chest',
  columns: 1,
  handleChange: () => console.log('Chest amount changed'),
  count: 0,
};

export default ChestInput;
