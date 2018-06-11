'user strict';

const Voyage = require('./Voyage');

/**
 * User class
 * Has the following properties:
 *  - id: string
 *  - username: string
 *  - totalVoyages: object
 *  - totalRewards: object
 *  - topVoyages: array
 *  - recentVoyages: array
 *  - timeCreated: number
 *  - timeUpdated: number
 * @constructor
 * @param {object} data User data
 * @param {string} data.id Unique user ID
 * @param {string} data.username Optional username
 */
function User(data) {
  // Fail if no constructor data was provided.
  if (!data) throw new Error('No constructor data provided to User');

  // Verify an ID was provided
  if (Object.prototype.hasOwnProperty.call(data, 'id')) {
    if (typeof data.id === 'string') {
      this.id = data.id;
    } else throw new Error('user.id is not a string');
  } else throw new Error('user.id not provided');

  // Add a username if one was provided
  if (Object.prototype.hasOwnProperty.call(data, 'username')) {
    if (typeof data.id === 'string') {
      this.username = data.username;
    }
  }

  // Track total voyages
  this.totalVoyages = {
    goldHoarders: {
      completed: 0,
      partiallyCompleted: 0,
    },
    orderOfSouls: {
      completed: 0,
      partiallyCompleted: 0,
    },
  };

  // Track total item rewards
  this.totalRewards = {
    castaway: 0,
    seafarer: 0,
    marauder: 0,
    captains: 0,
    grogs: 0,
    sorrow: 0,
    foul: 0,
    disgraced: 0,
    hateful: 0,
    villainous: 0,
  };

  this.recentVoyages = [];
  this.topVoyages = [];

  // Set time created and time updated
  const time = new Date().getTime();
  this.timeCreated = time;
  this.timeUpdated = time;


  /* Methods */

  // Add a new voyage
  this.addVoyage = (voyage) => {
    // How many voyages to keep in recentVoyages and topVoyages?
    const MAXENTRIES = 5;

    if (voyage instanceof Voyage) {
      // Increment totalVoyages by voyage type
      const { company, completed } = voyage.contract;
      if (completed) this.totalVoyages[company].completed += 1;
      else this.totalVoyages[company].partiallyCompleted += 1;

      // Increment totalRewards with voyage content
      const { haul } = voyage;
      // Loop through Haul keys
      const haulKeys = Object.keys(haul);
      for (let i = 0; i < haulKeys.length; i += 1) {
        // Grab the key
        const key = haulKeys[i];
        // Increment items at key position
        this.totalRewards[key] = this.totalRewards[key] + haul[key];
      }

      // Add voyage to recentVoyages and trim to max entries
      this.recentVoyages.push(voyage);
      this.recentVoyages = this.recentVoyages.slice(0, MAXENTRIES);

      // Add voyage to topVoyages, if it is worthy
      this.topVoyages.push(voyage);
      this.topVoyages = this.topVoyages.slice(0, MAXENTRIES);
    } else throw new Error('Could not add new voyage. Provided item was not of type Voyage.');
  };
}

module.exports = User;
