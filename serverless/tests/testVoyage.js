const Haul = require('../schemas/Haul');
const Contract = require('../schemas/Contract');
const Voyage = require('../schemas/Voyage');

/**
 * Print a console logging separator
 */
function lineBreak() {
  console.log('-------------------------------');
}

function testVoyage() {
  // Partial haul
  const partialHaulData = {
    castaway: 3,
    captains: 3,
    grogs: 3,
    sorrow: 3,
    disgraced: 3,
    hateful: 3,
  };
  console.log('Creating new Haul with partial data');
  const partialHaul = new Haul(partialHaulData);
  console.log('Created partial Haul', partialHaul);

  lineBreak();

  const contractData = {
    company: 'orderOfSouls',
    rank: 40,
    completed: false,
  };
  console.log('Creating new Contract');
  const contract = new Contract(contractData);
  console.log('Created contract', contract);

  lineBreak();

  console.log('Creating voyage with aforementioned data');
  const voyage = new Voyage('misa', contract, partialHaul);
  if (!(voyage instanceof Error)) console.log('', voyage, '\n\n---- TEST SUCCESS ----');
}

module.exports = testVoyage;
