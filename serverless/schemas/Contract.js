'use strict';

/**
 * Contract class.
 *
 * Has the following properties:
 *  - Company, string, 'goldHoarders' or 'orderOfSouls'
 *  - Rank, number, in the range [0,50]
 *  - Completed, boolean
 *
 * @constructor
 * @param {object} data Contract data.
 * @param {string} data.company Which company issued the voyage.
 * @param {number} data.rank Voyage rank
 * @param {boolean} data.completed Was the voyage fully completed or only partially
 */
function Contract(data) {
  // Verify that constructor data was provided.
  if (data) {
    // Verify that a company was provided and it is one of the accepted values.
    if (Object.prototype.hasOwnProperty.call(data, 'company')) {
      const allowedCompanies = ['goldHoarders', 'orderOfSouls'];
      if (allowedCompanies.indexOf(data.company) > -1) {
        this.company = data.company;
      } else throw new Error('contract.company is not an accepted value');
    } else throw new Error('contract.company not provided');

    // Verify that a rank was provided and it is a multiple of five in the range [0,50]
    if (Object.prototype.hasOwnProperty.call(data, 'rank')) {
      if (data.rank >= 0 && data.rank <= 50 && data.rank % 5 === 0) {
        this.rank = data.rank;
      } else throw new Error('contract.rank is not divisible by 5 or in the range [0,50]');
    } else throw new Error('contract.rank not provided');

    // Verify that completed was provided and it is a boolean
    if (Object.prototype.hasOwnProperty.call(data, 'completed')) {
      if (typeof data.completed === 'boolean') {
        this.completed = data.completed;
      } else throw new Error('contract.completed is not a boolean');
    } else throw new Error('contract.completed not provided');
  } else throw new Error('No data provided to contract constructor');
}

module.exports = Contract;
