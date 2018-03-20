const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'auth:sicolo',
  describe: 'Sign up, confirm and login with passed credentials.',
  builder,
  handler,
};
