module.exports = yargs => yargs
  .option('name', {
    demandOption: true,
    type: 'string',
  });

