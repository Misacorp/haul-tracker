/**
 * Stores haul data; treasures and what company they're for.
 */
class Haul {
  /**
   * Checks if a value is a positive integer.
   * @param {*} value Value to check
   * @returns {number} Given value if it is valid, 0 if not.
   */
  static isItemCount(value) {
    if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
      return value;
    }
    return 0;
  }


  /**
   * Constructs a new haul.
   * @param {object} data Haul data
   *
   * @param {object} data.goldHoarders What Gold Hoarders treasure does the haul contain.
   * @param {number} data.goldHoarders.castaway Amount of Castaway's chests
   * @param {number} data.goldHoarders.seafarer Amount of Seafarer's chests
   * @param {number} data.goldHoarders.marauder Amount of Marauder's chests
   * @param {number} data.goldHoarders.captain Amount of Captain's chests
   * @param {number} data.goldHoarders.grogs Amount of Chests of a Thousand Grogs
   * @param {number} data.goldHoarders.sorrow Amount of Chests of Sorrow
   *
   * @param {object} data.orderOfSouls What Order of Souls treasure does the haul contain.
   * @param {number} data.orderOfSouls.foul Amount of Foul bounty skulls
   * @param {number} data.orderOfSouls.disgraced Amount of Disgraced bounty skulls
   * @param {number} data.orderOfSouls.hateful Amount of Hateful bounty skulls
   * @param {number} data.orderOfSouls.villainous Amount of Villainous bounty skulls
   */
  constructor(data) {
    // Default values
    const defaults = {
      goldHoarders: {
        castaway: 0,
        seafarer: 0,
        marauder: 0,
        captain: 0,
        grogs: 0,
        sorrow: 0,
      },
      orderOfSouls: {
        foul: 0,
        disgraced: 0,
        hateful: 0,
        villainous: 0,
      },
    };

    // Parameters were provided. Check if they're valid and set values accordingly.
    if (data) {
      const { goldHoarders, orderOfSouls } = data;

      if (goldHoarders) {
        // Set Gold Hoarders values
        this.goldHoarders = {
          castaway: Haul.isItemCount(goldHoarders.castaway),
          seafarer: Haul.isItemCount(goldHoarders.seafarer),
          marauder: Haul.isItemCount(goldHoarders.marauder),
          captain: Haul.isItemCount(goldHoarders.captain),
          grogs: Haul.isItemCount(goldHoarders.grogs),
          sorrow: Haul.isItemCount(goldHoarders.sorrow),
        };
      } else {
        this.goldHoarders = defaults.goldHoarders;
      }

      if (orderOfSouls) {
        this.orderOfSouls = {
          foul: Haul.isItemCount(orderOfSouls.foul),
          disgraced: Haul.isItemCount(orderOfSouls.disgraced),
          hateful: Haul.isItemCount(orderOfSouls.hateful),
          villainous: Haul.isItemCount(orderOfSouls.villainous),
        };
      } else {
        this.orderOfSouls = defaults.orderOfSouls;
      }
    } else {
      // No parameter was provided. Create a default Haul.
      this.goldHoarders = defaults.goldHoarders;
      this.orderOfSouls = defaults.orderOfSouls;
    }
  }
}

export default Haul;
