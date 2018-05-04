/**
 * Stores identity data; username and password.
 */
class Identity {
  /**
   * Checks if a value is valid.
   * @param {*} value Value to check
   */
  static isValid(value) {
    if (typeof value === 'string') {
      return value;
    }
    return '';
  }

  /**
   * Constructs a new user data object
   * @param {object} data User data
   * @param {string} data.username Username, length in the range [4,20].
   * @param {string} data.password Password, length in the range [4,20].
   */
  constructor(data) {
    if (data) {
      // Parameters were provided. Check if they're valid and set values accordingly.
      const { username, password } = data;

      // Set username
      this.username = Identity.isValid(username);

      // Set password
      this.password = Identity.isValid(password);
    } else {
      // No parameter was provided. Create a default Haul.
      this.username = '';
      this.password = '';
    }
  }
}

export default Identity;
