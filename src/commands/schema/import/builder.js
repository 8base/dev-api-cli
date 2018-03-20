module.exports = yargs => yargs
  .option('file', {
    demandOption: true,
    default: './IMPORT.json',
    type: 'string',
  });
