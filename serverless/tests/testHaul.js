const Haul = require('../schemas/Haul');

/**
 * Print a console logging separator
 */
function lineBreak() {
  console.log('-------------------------------');
}

function testHaul() {
  // Complete haul
  const haulData = {
    castaway: 7,
    seafarer: 7,
    marauder: 7,
    captains: 7,
    grogs: 7,
    sorrow: 7,
    foul: 7,
    disgraced: 7,
    hateful: 7,
    villainous: 7,
  };
  console.log('Creating new Haul with complete data');
  const haul = new Haul(haulData);
  console.log('Created complete Haul', haul);

  lineBreak();

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

  // Haul with extra data
  const extraHaulData = {
    castaway: 5,
    hateful: 5,
    notSupposedToBeHere: 5,
  };
  console.log('Creating new Haul with extra key');
  const extraHaul = new Haul(extraHaulData);
  console.log('Created extra key Haul', extraHaul);


  lineBreak();

  // Haul with erroneous data
  const errorHaulData = {
    castaway: 8,
    hateful: 'NotANumber',
    sorrow: -10,
    disgraced: undefined,
    captains: ['Array element', 'Element two'],
  };
  const errorHaul = new Haul(errorHaulData);
  console.log('Created erroneous Haul', errorHaul);
}

module.exports = testHaul;
