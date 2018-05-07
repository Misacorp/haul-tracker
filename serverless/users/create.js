'use strict';

const AWS = require('aws-sdk');
const User = require('./User');
const uuid = require('uuid/v4');
const animalName = require('adjective-adjective-animal');

const db = new AWS.DynamoDB.DocumentClient();

/**
 * Create a new user
 * @param {*} event AWS event
 * @param {*} context AWS context
 * @param {function} callback Callback function for when execution has finished
 */
const create = (event, context, callback) => {
  // Read event body and set values if some aren't provided.
  const data = JSON.parse(event.body);

  // Set username
  let username = data.username;
  if (!username) {
    // Assign the user a random username.
    // animalName returns a promise so we'll need to wait for these to resolve later.
    username = animalName({ format: 'pascal', adjectives: 1 });
  }

  // Set password
  let password = data.password;
  if (!password) {
    // Assign the user a random password.
    // animalName returns a promise so we'll need to wait for these to resolve later.
    password = animalName({ format: 'pascal', adjectives: 2 });
  }

  // When this entry was created (and updated).
  const timestamp = new Date().getTime();

  // Wait for username and password to resolve before continuing.
  Promise.all([username, password])
    .then((values) => {
      // Username and password resolved into the 'values' parameter: [username, password]
      // Set parameters for DynamoDB request.
      const params = {
        TableName: 'users',       // Which table to use
        Item: new User({
          id: uuid(),
          username: values[0],    // Username from resolved promise values
          password: values[1],    // Password from resolved promise values
          createdAt: timestamp,
          updatedAt: timestamp,
        }),
      };

      // Save data into DynamoDB
      db.put(params, (error, result) => {
        if (error) {
          // Error occured when putting data into DB.
          console.log(error);
          callback(new Error('Couldn\'t create a new user'));
          return;
        }

        // Getting from DB was succesful. Create a response object.
        const response = {
          statusCode: 200,
          body: JSON.stringify(result.Item),
        };

        // Return the response
        callback(null, response);
      });
    })
    .catch((e) => {
      // Promises didn't resolve.
      console.log(e);
      callback(e);
    });
};

module.exports = { create };
