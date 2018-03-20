module.exports = yargs => yargs
  .option('email', {
    demandOption: true,
    type: 'string',
  })
  .option('password', {
    demandOption: true,
    type: 'string',
  })
  .option('firstName', {
    demandOption: false,
    default: 'Ivan',
    type: 'string',
  })
  .option('lastName', {
    demandOption: false,
    default: 'Ivanov',
    type: 'string',
  })
  .option('organization', {
    demandOption: false,
    default: '8base',
    type: 'string',
  });

