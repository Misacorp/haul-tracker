'use strict';

const AWS = require('aws-sdk');
const Voyage = require('../schemas/Voyage');


/**
 * Builds an HTTP error to return
 * @param {number} code HTTP status code
 * @param {object} errorObject Error object to return
 * @param {function} callback Callback function
 */
const returnError = (code, errorObject, callback) => {
  console.error(errorObject);

  const response = {
    statusCode: code,
    body: JSON.stringify({
      message: errorObject.message,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  callback(null, response);
};


/**
 * Create a new voyage
 * @param {*} event AWS event
 * @param {*} context AWS context
 * @param {function} callback Callback function for when execution has finished
 */
const create = (event, context, callback) => {
  // Log that event yo
  const { body } = event;

  // Check that body exists
  if (body) {
    // Create a voyage and handle its errors
    const { voyage } = JSON.parse(body);

    if (voyage) {
      const { owner, contract, haul } = voyage;
      if (owner && contract && haul) {
        console.log(voyage);
        try {
          const thisVoyage = new Voyage(owner, contract, haul);
          console.log(thisVoyage);
          const response = {
            statusCode: 200,
            body: JSON.stringify(thisVoyage),
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          };
          callback(null, response);
        } catch (e) {
          returnError(400, e, callback);
        }
      } else {
        // Voyage doesn't have required components
        // Handle this error in Voyage constructor instead?
        const error = new Error('Voyage does not include owner, contract or haul');
        returnError(400, error, callback);
      }
    } else {
      // No voyage in request body
      const error = new Error('Request does not contain a voyage object');
      returnError(400, error, callback);
    }
  } else {
    // Request has no body
    const error = new Error('Request has no body');
    returnError(400, error, callback);
  }
};

module.exports = { create };
