const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'auth:logout',
  describe: 'Logout and clear saved credentials.',
  builder,
  handler,
};
