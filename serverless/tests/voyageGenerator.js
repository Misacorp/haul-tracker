'use strict';

const Contract = require('../schemas/Contract');
const Haul = require('../schemas/Haul');
const Voyage = require('../schemas/Voyage');

/**
 * Generate a random positive integer.
 * @param {*} max Optional maximum value, defaults to 10.
 * @returns number
 */
function randInt(max) {
  let MAX = 10;
  // Take max value from parameter is one was given
  if (max && typeof max === 'number' && max > 0) MAX = max;

  return Math.floor(Math.random() * MAX);
}


/**
 * Flip a coin
 * @returns boolean
 */
function coin() {
  if (Math.random() > 0.5) return true;
  return false;
}


/**
 * Create a random Contract
 */
function randomContract() {
  // Random company
  const company = coin() ? 'goldHoarders' : 'orderOfSouls';

  // Random rank
  let rank = randInt(50);
  rank -= (rank % 5); // Divisible by five

  // Random completed state
  const completed = coin();

  // Return a new Contract object
  return new Contract({
    company,
    rank,
    completed,
  });
}


/**
 * Create a random Haul
 */
function randomHaul() {
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

  const haulData = {};
  // Loop through treasures and add a random amount to haul.
  for (let i = 0; i < treasures.length; i += 1) {
    const key = treasures[i];
    haulData[key] = randInt();
  }

  // Return a new Haul object
  return new Haul(haulData);
}


/**
 * Create a random Voyage
 */
function randomVoyage() {
  const owner = 'lolxd';
  const contract = randomContract();
  const haul = randomHaul();
  return new Voyage(owner, contract, haul);
}


// Export random functions
module.exports = {
  randomContract,
  randomHaul,
  randomVoyage,
};
