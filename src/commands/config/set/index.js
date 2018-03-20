const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'config:set',
  describe: 'Set a config value with passed name.',
  builder,
  handler,
};
