/**
 * Stores Voyage data; username and password.
 */
class Voyage {
  /**
   * Constructs a new voyage data object
   * @param {object} data Voyage data
   * @param {string} data.company Company that gives the voyage
   * @param {number} data.rank Voyage rank in levels, increments of five (0, 5, 10, ...)
   */
  constructor(data) {
    // Default values.
    const defaultCompany = 'goldHoarders';
    const defaultRank = 0;

    if (data) {
      // Parameters were provided. Check if they're valid and set values accordingly.
      const { company, rank } = data;

      // Validate company
      if (company) {
        // Check if company is a valid one. Default to goldHoarders if not.
        const allowedCompanies = ['goldHoarders', 'orderOfSouls'];
        this.company = allowedCompanies.indexOf(company) > -1 ? company : defaultCompany;
      } else {
        this.company = defaultCompany;
      }

      // Validate rank
      if (rank || rank === 0) {
        // Check if rank is a valid one. Default to 0 if not.
        const allowedRanks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
        this.rank = (allowedRanks.indexOf(rank) > -1 && typeof rank === 'number') ? rank : defaultRank;
      } else {
        this.rank = defaultRank;
      }
    } else {
      // No parameter was provided. Create a default Voyage.
      this.company = defaultCompany;
      this.rank = defaultRank;
    }
  }

  /**
   * Gets real name of this company.
   */
  getCompanyName() {
    switch (this.company) {
      case 'goldHoarders':
        return 'Gold Hoarders';
      case 'orderOfSouls':
        return 'Order of Souls';
      default:
        return '[NO COMPANY SELECTED]';
    }
  }
}

export default Voyage;
