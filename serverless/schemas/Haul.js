'use strict';

/**
 * Haul class.
 *
 * Has the following properties:
 *  - castaway:  number, non-negative
 *  - seafarer:  number, non-negative
 *  - marauder:  number, non-negative
 *  - captains:  number, non-negative
 *  - grogs: number, non-negative
 *  - sorrow:  number, non-negative
 *  - foul:  number, non-negative
 *  - disgraced:  number, non-negative
 *  - hateful:  number, non-negative
 *  - villainous:  number, non-negative
 *
 * @constructor
 * @param {object} data haul data.
 * @param {string} data.company Which company issued the voyage.
 * @param {number} data.rank Voyage rank
 * @param {boolean} data.completed Was the voyage fully completed or only partially
 */
function Haul(data) {
  // Verify that constructor data was provided.
  if (data) {
    // Build an array of allowed keys
    const treasures = [
      'castaway',
      'seafarer',
      'marauder',
      'captains',
      'grogs',
      'sorrow',
      'foul',
      'disgraced',
      'hateful',
      'villainous',
    ];

    // For each key in data, check if it exists in the allowed keys.
    const validKeys = Object.keys(data).filter((item) => {
      console.log(item);
      if (treasures.indexOf(item) > -1) return true;
      return false;
    });

    // Use valid keys to get the correct data.
    for (let i = 0; i < validKeys.length; i += 1) {
      const key = validKeys[i];
      const value = data[key];

      // Values are numbers
      if (typeof value === 'number') {
        // Values are non-negative integers
        if (value >= 0 && value === parseInt(value, 10)) {
          this[key] = data[key];
        } else throw new RangeError(`haul.${key} is out of range or not an integer`);
      } else throw new TypeError(`haul.${key} is of type ${typeof value}, expected a number`);
    }
  }
}

module.exports = Haul;
