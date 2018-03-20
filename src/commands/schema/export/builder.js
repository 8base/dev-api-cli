module.exports = yargs => yargs
  .option('file', {
    demandOption: true,
    default: './EXPORT.json',
    type: 'string',
  });
