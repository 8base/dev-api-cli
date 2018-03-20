module.exports = yargs => yargs
  .option('email', {
    demandOption: true,
    type: 'string',
    hidden: true,
  })
  .option('code', {
    demandOption: true,
    type: 'string',
    hidden: true,
  })
  .option('password', {
    demandOption: true,
    type: 'string',
    hidden: true,
  })
  .option('save', {
    demandOption: false,
    default: true,
    hidden: true,
    type: 'boolean',
  });

