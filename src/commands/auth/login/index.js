const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'auth:login',
  describe: 'Login with passed credentials.',
  builder,
  handler,
};
