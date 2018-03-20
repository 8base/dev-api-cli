const chalk = require('chalk');

const INFO_HEAD = '[INFO]';
const WARN_HEAD = '[WARN]';
const ERR_HEAD = '[ERR]';

const info = (message, color = 'white') => {
  const head = `${chalk.blue(INFO_HEAD)} `;

  // eslint-disable-next-line no-console
  console.log(`${head}${chalk[color](message).replace(/\n/g, `\n${head}`)}`);
};

const warn = (message, color = 'white') => {
  const head = `${chalk.yellow(WARN_HEAD)} `;

  // eslint-disable-next-line no-console
  console.log(`${head}${chalk[color](message).replace(/\n/g, `\n${head}`)}`);
};

const err = (message, color = 'white') => {
  const head = `${chalk.red(ERR_HEAD)} `;

  // eslint-disable-next-line no-console
  console.log(`${head}${chalk[color](message).replace(/\n/g, `\n${head}`)}`);
};

module.exports = {
  info,
  warn,
  err,
};
