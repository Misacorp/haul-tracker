'use strict';

/**
 * Haul class
 * @constructor
 * @param {object} data haul data.
 * @param {string} data.company Which company issued the voyage.
 * @param {number} data.rank Voyage rank
 * @param {boolean} data.completed Was the voyage fully completed or only partially
 */
function Haul(data) {
  // Verify that constructor data was provided.
  if (data) {
    // Verify that a company was provided and it is one of the accepted values.
    if (data.hasOwnProperty('company')) {
      const allowedCompanies = ['goldHoarders', 'orderOfSouls'];
      if (allowedCompanies.indexOf(data.company) > -1) {
        this.company = data.company;
      } else throw new Error('haul.company is not an accepted value');
    } else throw new Error('haul.company not provided');

    // Verify that a rank was provided and it is a multiple of five in the range [0,50]
    if (data.hasOwnProperty('rank')) {
      if (data.rank >= 0 && data.rank <= 50 && data.rank % 5 === 0) {
        this.rank = data.rank;
      } else throw new Error('haul.rank is not divisible by 5 or in the range [0,50]');
    } else throw new Error('haul.rank not provided')

    // Verify that completed was provided and it is a boolean
    if (data.hasOwnProperty('completed')) {
      if (typeof data.completed === 'boolean') {
        this.completed = data.completed;
      } else throw new Error('haul.completed is not a boolean');
    } else throw new Error('haul.completed not provided');
  } else throw new Error('No data provided to haul constructor');
}

module.exports = Haul;