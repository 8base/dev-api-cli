module.exports = async (argv, ctx) => {
  const tables = await ctx.client.getTables(true);

  for (let i = 0; i < tables.length; i++) {
    await ctx.client.deleteTable(tables[i].id);
  }
};
