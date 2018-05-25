const faker = require('faker');

module.exports = async (argv, ctx) => {
  const tables = await ctx.client.getTables(true);

  for (let i = 0; i < tables.length; i++) {
    for (let j = 0; j < 10; j++) {
      await ctx.client.createEntity(tables[i].name, tables[i].fields.reduce((result, field) => {
        const nextResult = result;

        if (field.fieldType === 'TEXT') {
          nextResult[field.name] = faker.lorem.word();
        } else if (field.fieldType === 'NUMBER') {
          nextResult[field.name] = faker.random.number();
        } else if (field.fieldType === 'DATE') {
          nextResult[field.name] = (new Date()).toISOString();
        }

        return nextResult;
      }, {}));
    }
  }
};
