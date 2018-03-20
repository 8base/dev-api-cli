const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'tables:drop',
  describe: 'Drop all user tables.',
  builder,
  handler,
};
