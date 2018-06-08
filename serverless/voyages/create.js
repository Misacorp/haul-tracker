'use strict';

const AWS = require('aws-sdk');
const Voyage = require('../schemas/Voyage');

const create = (event, context, callback) => {
  // Log that event yo
  console.log(event.body);

  // Create a voyage and handle its errors
  const { voyage } = JSON.parse(event.body);
  if (voyage) {
    console.log(voyage);
    try {
      const thisVoyage = new Voyage(voyage);
      const response = {
        status: 200,
        body: JSON.stringify(thisVoyage),
      };
      callback(null, response);
    } catch (e) {
      callback(e);
    }
  } else callback(new Error('No voyage found in event body'));
};

module.exports = { create };
