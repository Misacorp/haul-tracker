import Haul from './dataTypes/Haul';
import Identity from './dataTypes/Identity';
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
    const { voyage, haul, identity } = data;

    // Check that each data component is what it's supposed to be.
    if (!(haul instanceof Haul)) reject(new TypeError('Haul is not of type Haul'));
    if (!(identity instanceof Identity)) reject(new TypeError('Identity is not of type Identity'));
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
    }, 2000);
  });
}

export default submitHaul;
