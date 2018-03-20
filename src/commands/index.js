const middlewares = require('../middlewares');

const commands = {};

commands['auth:confirm'] = require('./auth/confirm');
commands['auth:login'] = require('./auth/login');
commands['auth:logout'] = require('./auth/logout');
commands['auth:sicolo'] = require('./auth/sicolo');
commands['auth:signup'] = require('./auth/signup');
commands['auth:whoami'] = require('./auth/whoami');
commands.config = require('./config');
commands['config:get'] = require('./config/get');
commands['config:set'] = require('./config/set');
commands['schema:export'] = middlewares.authenticated(require('./schema/export'));
commands['schema:import'] = middlewares.authenticated(require('./schema/import'));
commands['tables:drop'] = middlewares.authenticated(require('./tables/drop'));
commands['tables:fill'] = middlewares.authenticated(require('./tables/fill'));

module.exports = commands;
