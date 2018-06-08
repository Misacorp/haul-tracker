'use strict';

const uuid = require('uuid');

const Contract = require('./Contract');
const Haul = require('./Haul');

/**
 * Voyage class
 *
 * @constructor
 * @param {string} identity Voyage owner identity
 * @param {object} contract Contract data
 * @param {object} haul Haul data
 */
function Voyage(owner, contract, haul) {
  // Set owner
  if (typeof owner === 'string') {
    if (owner.length > 0) {
      this.owner = owner;
    } else throw new Error('voyage owner identity is too short');
  } else throw new TypeError(`voyage owner is of type ${typeof owner}, expected string`);

  // Generate a unique id for this voyage
  this.id = uuid.v4();

  // Create contract from supplied data
  try {
    this.contract = new Contract(contract);
  } catch (e) {
    console.error('Unable to create contract. Did you provide a valid Contract object?', e);
    throw e;
  }

  // Create haul from supplied data
  try {
    this.haul = new Haul(haul);
  } catch (e) {
    console.error('Unable to create haul. Did you provide a valid Haul object?', e);
    throw e;
  }

  // Set time created and time updated
  const time = new Date().getTime();
  this.timeCreated = time;
  this.timeUpdated = time;
}

module.exports = Voyage;
