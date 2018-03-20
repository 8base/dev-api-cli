const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'config',
  describe: 'Display a config.',
  builder,
  handler,
};
