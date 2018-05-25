const fs = require('fs');

module.exports = async (argv, ctx) => {
  const schema = await ctx.client.exportSchema();
  schema.version = ctx.pkg.version;
  fs.writeFileSync(argv.file, JSON.stringify(schema, null, 2));
};
