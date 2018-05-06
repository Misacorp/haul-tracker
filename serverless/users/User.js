'use strict';

/**
 * User class
 * @constructor
 * @param {object} data User data
 */
function User(data) {
  // Verify that id was provided and set it. Otherwise throw an error.
  if (data.id) this.id = data.id;
  else throw new Error('id not provided to User constructor');

  // Verify that username was provided and set it. Otherwise throw an error.
  if (data.username) this.username = data.username;
  else throw new Error('username not provided to User constructor');

  // Verify that password was provided and set it. Otherwise throw an error.
  if (data.password) this.password = data.password;
  else throw new Error('password not provided to User constructor');

  // Verify that createdAt was provided and set it. Otherwise throw an error.
  if (data.createdAt) this.createdAt = data.createdAt;
  else throw new Error('createdAt not provided to User constructor');

  // Verify that updatedAt was provided and set it. Otherwise throw an error.
  if (data.updatedAt) this.updatedAt = data.updatedAt;
  else throw new Error('updatedAt not provided to User constructor');
}

module.exports = User;
