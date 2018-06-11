'use strict';

const { randomVoyage } = require('./voyageGenerator');
const User = require('../schemas/User');

function testUser() {
  // Create a user
  const user1 = new User({ id: 'userId1', username: 'username1' });
  const user2 = new User({ id: 'userId2', username: 'username2' });


  // Add voyages to user
  const LOOPS = 12;
  for (let i = 0; i < LOOPS; i += 1) {
    user1.addVoyage(randomVoyage());
    if (i % 2 === 0) {
      user2.addVoyage(randomVoyage());
    }
  }

  // Log stuff yo
  console.log(user1);
  console.log(user2);
}

// Run test
testUser();

// Export test function
module.exports = testUser();
