const { randomVoyage } = require('./voyageGenerator');

function testVoyage() {
  const v = randomVoyage();
  console.log(v);
}

// Run test
testVoyage();

// Export test function
module.exports = testVoyage;
