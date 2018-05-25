const fs = require('fs');
const pick = require('lodash/pick');

module.exports = async (argv, ctx) => {
  const schema = JSON.parse(fs.readFileSync(argv.file, 'utf8'));

  if (ctx.pkg.version !== schema.version) {
    ctx.logger.warn(`Schema in file '${argv.file}' have a different version!`);
    return;
  }

  const systemTables = (await ctx.client.getTables(false)).reduce((result, table) => {
    if (table.isSystem) {
      result[table.name] = table.id; // eslint-disable-line no-param-reassign
    }
    return result;
  }, {});

  const importedTables = new Map();

  for (const schemaTable of schema.tables) {
    let table;

    if (schemaTable.isSystem) {
      table = {
        id: systemTables[schemaTable.name],
      };
    } else {
      table = await ctx.client.createTable({
        name: schemaTable.name,
        displayName: schemaTable.displayName,
      });
    }

    importedTables.set(schemaTable.name, table);
  }

  for (const schemaTable of schema.tables) {
    if (schemaTable.isSystem) {
      continue;
    }

    const table = importedTables.get(schemaTable.name);

    for (const schemaField of schemaTable.fields) {
      const field = pick(schemaField, [
        'name',
        'displayName',
        'fieldType',
        'isList',
        'isRequired',
        'isUnique',
        'defaultValue',
        'description',
      ]);

      if (schemaField.fieldTypeAttributes) {
        field.fieldTypeAttributes = pick(schemaField.fieldTypeAttributes, [
          'format',
          'fieldSize',
          'listOptions',
          'precision',
          'currency',
          'minValue',
          'maxValue',
          'showTitle',
          'showUrl',
          'maxSize',
          'typeRestrictions',
        ]);
      }

      if (schemaField.relation) {
        const refTableName = schemaField.relation.refTable.name;
        const refTable = importedTables.get(refTableName);

        if (refTable.relations && refTable.relations[schemaTable.name]) {
          if (refTable.relations[schemaTable.name].includes(schemaField.name)) {
            ctx.logger.info(`Skip relation field '${schemaField.name}'. Relation already exists: ${JSON.stringify(refTable.relations, null, 2)}.\n`, 'yellow');
            continue;
          }
        }

        field.relation = {
          ...pick(schemaField.relation, [
            'refFieldIsList',
            'refFieldIsRequired',
            'refFieldName',
            'refFieldDisplayName',
          ]),
          refTableId: refTable.id,
        };

        table.relations = table.relations || {};

        if (table.relations[refTableName]) {
          table.relations[refTableName].push(field.relation.refFieldName);
        } else {
          table.relations[refTableName] = [field.relation.refFieldName];
        }

        importedTables.set(schemaTable.name, table);
      }

      field.tableId = table.id;

      await ctx.client.createField(field);
    }
  }
};
