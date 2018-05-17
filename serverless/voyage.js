/**
 * Data types used throughout the app:
 *  - Contract
 *  - Haul
 *  - Voyage
 */

 // Specifies the type of voyage
 const contract = {
   company: 'goldHoarders',
   rank: 40,
   completed: false,
 }

 // Specifies the rewards gained on a voyage
 const haul = {
   goldHoarders: {        // Split these into goldHoardersHaul and orderOfSoulsHaul?
     castaway: 30,
     seafarer: 62,
     marauder: 71,
     captains: 49,
     grogs: 9,
     sorrow: 11,
   },
   orderOfSouls: {
     foul: 30,
     disgraced: 62,
     hateful: 71,
     villainous: 49,
   },
 }


// Voyage
const voyage = {
  // AWS Cognito user ID from session
  owner: event.requestContext.identity.cognitoIdentityId,

  // voyage identifier
  id: uuid.v4(),

  // Voyage specs
  contract: {
    company: 'goldHoarders',
    rank: 40,
    completed: false,
  },

  // Haul specs
  haul: {
    goldHoarders: {
      castaway: 1,
      seafarer: 2,
      sorrow: 1,
    },
  },

  // Stats
  timeCreated: new Date().getTime(),
  timeUpdated: new Date().getTime(),
};


// USER
const user = {
  // AWS Cognito user ID. This is unique, right?
  id: event.requestContext.identity.cognitoIdentityId,

  // Other user info
  username: 'Misacorp',

  // Total voyages and their rewards.
  // Easy to calculate averages from this data.
  totalVoyages: {
    goldHoarders: {
      completed: 38,              // Fully completed voyages.
      partiallyCompleted: 22,     // Partially completed voyages.
      rewards: {                  // Total rewards from all voyages.
        castaway: 30,
        seafarer: 62,
        marauder: 71,
        captains: 49,
        grogs: 9,
        sorrow: 11,
      },
    },
    orderOfSouls: {
      completed: 12,
      partiallyCompleted: 34,
      rewards: {
        foul: 30,
        disgraced: 62,
        hateful: 71,
        villainous: 49,
      },
    },
  },

  // Top 5 voyages
  topVoyages: [
    /**
     * How do we determine the value of a haul?
     * Weight item types?
     * 
     * castaway: 1,
     * seafarer: 2,
     * marauder: 3,
     * captain: 4,
     * grogs: 5,
     * sorrow: 6,
     * 
     * foul: 1,
     * disgraced: 2,
     * hateful: 3,
     * villainous: 4,
     * 
     * Example 1:
     *    1 seafarer's chest and 4 marauder's chests.
     *    1*2 + 4*3 = 2 + 12 = 14
     * 
     * Example 2:
     *    3 disgraced skulls and 2 villanous skulls.
     *    3*2 + 2*4 = 6 + 8 = 14
     */
  ],

  // Five most recent voyages
  recentVoyages: [
    /**
     * Voyage id / Entire voyage object / Partial voyage object
     * 
     * ID:
     *   Pros:
     *     - Voyage data is stored in one place
     *     - Don't need to update user object when creating a new voyage object
     *     - Is nice and neat
     *   Cons:
     *     - Need to make API calls to voyages API to get content of voyages.
     *     - Processing all voyages takes time and costs money
     * 
     * Entire voyage object:
     *   Pros:
     *     - All data is readily accessible
     *   Cons:
     *     - Need to update user when creating a new voyage
     *     - Not all data is needed
     * 
     * Partial voyage object:
     *   Pros:
     *     - All data is readily accessible
     *     - Only necessary data is stored
     *   Cons:
     *     - Need to update user when creating a new voyage
     */
    {
      // Voyage highlights
      // Voyage
      company: 'orderOfSouls',
      rank: 30,
      completed: true,

      // Haul
      foul: 3,
      hateful: 1,
      villainous: 2,

      createdAt: haulCreationTime,
    },
  ],
};
