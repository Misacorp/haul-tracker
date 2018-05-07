'use strict';

const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();

// DynamoDB parameters
const params = {
  TableName: 'users',
};

/**
 * Read users
 * @param {*} event AWS event
 * @param {*} context AWS context
 * @param {function} callback Callback function for when execution has finished
 */
const read = (event, context, callback) => {
  // Read data from DynamoDB
  db.scan(params, (error, result) => {
    if (error) {
      // Error occured when putting data into DB.
      console.log(error);
      callback(new Error('Couldn\'t fetch users'));
      return;
    }

    // Getting from DB was succesful. Create a response object.
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };

    // Return the response
    callback(null, response);
  });
};

module.exports = { read };
