const fs = require('fs');
const pkg = require('../../../../package.json');

module.exports = async (argv, ctx) => {
  const schema = await ctx.client.exportSchema();
  schema.version = pkg.version;
  fs.writeFileSync(argv.file, JSON.stringify(schema, null, 2));
};
