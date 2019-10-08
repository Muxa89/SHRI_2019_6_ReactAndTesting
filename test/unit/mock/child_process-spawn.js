const mockSpawn = require('mock-spawn');

const stubText = 'stub text';
const mySpawn = mockSpawn();
require('child_process').spawn = mySpawn;
mySpawn.setDefault(mySpawn.simple(1, stubText));

module.exports.stubText = stubText;
