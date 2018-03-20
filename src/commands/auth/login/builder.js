module.exports = yargs => yargs
  .option('email', {
    demandOption: true,
    type: 'string',
  })
  .option('password', {
    demandOption: true,
    type: 'string',
  })
  .option('save', {
    demandOption: false,
    default: true,
    type: 'boolean',
  });

