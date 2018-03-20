const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'auth:whoami',
  describe: 'Display the current auth parameters.',
  builder,
  handler,
};
