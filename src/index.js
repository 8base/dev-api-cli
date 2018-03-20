#!/usr/bin/env node

const yargs = require('yargs');
const pkg = require('../package.json');
const commands = require('./commands');
const context = require('./middlewares/context');

// eslint-disable-next-line no-unused-expressions
Object.keys(commands).reduce(
  (result, name) => result.command(context(commands[name])),
  yargs
    .version(pkg.version)
    .usage('Usage: $0 <command> [options]'),
).argv;
