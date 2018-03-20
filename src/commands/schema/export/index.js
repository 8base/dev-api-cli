const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'schema:export',
  describe: 'Export tables to the schema file.',
  builder,
  handler,
};
