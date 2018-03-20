const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'config:get',
  describe: 'Display a config value with passed name.',
  builder,
  handler,
};
