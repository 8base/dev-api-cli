const fs = require('fs');
const pick = require('lodash/pick');
const findIndex = require('lodash/findIndex');
const find = require('lodash/find');

module.exports = async (argv, ctx) => {
  const schema = JSON.parse(fs.readFileSync(argv.file, 'utf8'));

  const tables = [];

  for (let i = 0; i < schema.tables.length; i++) {
    const table = schema.tables[i];

    tables.push(await ctx.client.createTable({
      name: table.name,
      displayName: table.displayName,
    }));
  }

  const createdRelations = {};

  for (let i = 0; i < schema.tables.length; i++) {
    for (let j = 0; j < schema.tables[i].fields.length; j++) {
      const field = pick(schema.tables[i].fields[j], [
        'name',
        'displayName',
        'description',
        'fieldType',
        'isList',
        'isRequired',
        'isUnique',
        'defaultValue',
        'relation',
        'fieldTypeAttributes',
      ]);

      if (field.fieldTypeAttributes) {
        field.fieldTypeAttributes = pick(field.fieldTypeAttributes, [
          'format',
          'fieldSize',
        ]);
      }

      if (field.relation) {
        createdRelations[field.relation.relationTableName] = true;

        const relationTableIndex = findIndex(schema.tables, { id: field.relation.refTable.id });

        field.relation = {
          ...pick(field.relation, [
            'refFieldIsList',
            'refFieldIsRequired',
          ]),
          refFieldName: find(schema.tables[relationTableIndex].fields, {
            relation: {
              relationTableName: field.relation.relationTableName,
            },
          }).name,
          refTableId: tables[relationTableIndex].id,
        };
      }

      if (
        !field.relation ||
        !createdRelations[schema.tables[i].fields[j].relation.relationTableName]
      ) {
        await ctx.client.createField({
          ...field,
          tableId: tables[i].id,
        });
      }
    }
  }
};
