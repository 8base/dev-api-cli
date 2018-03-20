module.exports = async (argv, ctx) => {
  ctx.store.delete('auth');
  ctx.logger.info('You have successfully logged out!');
};
