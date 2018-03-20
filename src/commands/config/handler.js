module.exports = async (argv, ctx) => {
  const config = ctx.store.all.config || {};

  Object.keys(config).forEach((name) => {
    ctx.logger.info(`${name} = ${config[name]}`);
  });
};
