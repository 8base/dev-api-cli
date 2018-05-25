const fs = require('fs');
const pick = require('lodash/pick');
const pkg = require('../../../../package.json');
const logger = require('../../../logger');

module.exports = async (argv, ctx) => {
  // console.log(argv);
  const schema = JSON.parse(fs.readFileSync(argv.file, 'utf8'));
  if (pkg.version !== schema.version) {
    logger.warn(`Schema in file '${argv.file}' have different version!`);
    return;
  }

  // console.log("%o", schema);
  const systemTables = (await ctx.client.getTables(false)).reduce((result, table) => {
    if (table.isSystem) {
      result[table.name] = table.id;
    }
    return result;
  }, {});
  // console.log("systemTables %o", systemTables);

  const importedTables = new Map();

  for (const schemaTable of schema.tables) {
    let table;

    if (schemaTable.isSystem) {
      table = {
        id: systemTables[schemaTable.name]
      };
    } else {
      table = await ctx.client.createTable({
        name: schemaTable.name,
        displayName: schemaTable.displayName,
      })
    }

    importedTables.set(schemaTable.name, table);
  }
  // console.log("importedTables %o", importedTables);

  for (const schemaTable of schema.tables) {
    if (schemaTable.isSystem) {
      continue;
    }

    // console.log(schemaTable);
    const table = importedTables.get(schemaTable.name);
    // console.log(table);

    for (const schemaField of schemaTable.fields) {
      // console.log(schemaField);
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
            // console.log("SKIP!!!!! %j", schemaField);
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

      // console.log(field);
      await ctx.client.createField(field);
    }
  }
};
