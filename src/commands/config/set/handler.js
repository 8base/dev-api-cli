module.exports = async (argv, ctx) => {
  ctx.store.set(`config.${argv.name}`, argv.value);
};
