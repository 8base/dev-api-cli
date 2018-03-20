const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'tables:fill',
  describe: 'Fill all user tables with mock data.',
  builder,
  handler,
};
