const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'schema:import',
  describe: 'Import tables by passed schema file.',
  builder,
  handler,
};
