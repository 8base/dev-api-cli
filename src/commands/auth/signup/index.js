const builder = require('./builder');
const handler = require('./handler');

module.exports = {
  command: 'auth:signup',
  describe: 'Sign up with passed credentials.',
  builder,
  handler,
};
