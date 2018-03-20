module.exports = async (argv, ctx) => {
  const auth = ctx.store.all.auth || {};

  Object.keys(auth).forEach((name) => {
    ctx.logger.info(`${name} = ${auth[name]}`);
  });
};
