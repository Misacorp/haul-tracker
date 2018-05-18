import Haul from './dataTypes/Haul';
import Voyage from './dataTypes/Voyage';
import Response from './dataTypes/Response';

/**
 * Sends haul data to the server.
 * @param {object} data Haul data
 * @param {object} data.voyage Voyage details
 * @param {object} data.haul Haul details
 * @param {object} data.identity Identity details
 */
function submitHaul(data) {
  return new Promise((resolve, reject) => {
    const { voyage, haul } = data;

    // Check that each data component is what it's supposed to be.
    if (!(haul instanceof Haul)) reject(new TypeError('Haul is not of type Haul'));
    if (!(voyage instanceof Voyage)) reject(new TypeError('Voyage is not of type Voyage'));

    // Check other things before sending

    // Finally send the data
    // Do some ajax stuff here to send data.
    setTimeout(() => {
      const response = new Response({
        status: 200,
        message: 'Everything is good man',
      });
      resolve(response);
    }, 5000);
  });
}

export default submitHaul;
