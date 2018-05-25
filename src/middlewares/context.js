const Configstore = require('configstore');
const Client = require('../client');
const logger = require('../logger');

const STORE_NAME = '8base-cli-store';

const createContextHandler = handler => async (argv) => {
  const ctx = {};

  ctx.logger = logger;

  ctx.store = new Configstore(STORE_NAME);

  ctx.client = new Client({
    url: ctx.store.get('config.url'),
  });

  let result;

  try {
    result = await handler(argv, ctx);
  } catch (e) {
    // TODO Create normal error catching
    ctx.logger.err(`Something went wrong :/ ${JSON.stringify(e, null, 2)}`);
  }

  return result;
};

module.exports = module => ({
  ...module,
  handler: createContextHandler(module.handler),
});
