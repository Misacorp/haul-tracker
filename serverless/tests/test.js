const testHaul = require('./testHaul');
const testVoyage = require('./testVoyage');

try {
  testHaul();
} catch (e) {
  console.log('testHaul encountered the following error', e);
}

try {
  testVoyage();
} catch (e) {
  console.log('testVoyage encountered the following error', e);
}

console.log('\n-- TEST COMPLETE --');
