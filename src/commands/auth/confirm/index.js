const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'auth:confirm',
  describe: 'Confirm with passed credentials.',
  builder,
  handler,
};
