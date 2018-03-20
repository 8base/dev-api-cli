module.exports = async (argv, ctx) => {
  ctx.logger.info(`${argv.name} = ${ctx.store.get(`config.${argv.name}`)}`);
};
