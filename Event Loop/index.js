const fs = require('fs');

function log(label) {
  console.log(`${Date.now()}  ${label}`);
}

console.log('start');

setTimeout(() => log('setTimeout 0'), 0);

setImmediate(() => log('setImmediate'));

Promise.resolve().then(() => log('Promise.then'));

process.nextTick(() => log('process.nextTick'));

fs.readFile(__filename, () => {
  log('fs.readFile callback (I/O)');

  process.nextTick(() => log('process.nextTick nested'));
  Promise.resolve().then(() => log('Promise.then nested'));
});

console.log('end');



