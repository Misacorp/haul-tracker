/**
 * Stores response data.
 */
class Response {
  /**
   * Constructs new respone object
   * @param {object} data Response object
   */
  constructor(data) {
    if (data) {
      const { status, message } = data;
      this.status = status;
      this.message = message;
    } else {
      this.status = 'No status';
      this.message = 'No message';
    }
  }
}

export default Response;
