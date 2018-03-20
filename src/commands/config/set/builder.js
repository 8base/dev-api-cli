module.exports = yargs => yargs
  .option('name', {
    demandOption: true,
    type: 'string',
  })
  .option('value', {
    demandOption: true,
    type: 'string',
  });
