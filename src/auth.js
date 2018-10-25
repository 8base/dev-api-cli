const auth = require('auth0-js');

var auth0 = new auth0.WebAuth({
  domain: '8base-dev.auth0.com',
  clientID: 'lJDVb8s0468eDLucm9bxHGhoTm2DJPfA',
});

module.exports = auth0;
