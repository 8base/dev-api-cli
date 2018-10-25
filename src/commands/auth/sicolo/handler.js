const TestInbox = require('test-inbox');

module.exports = async (argv, ctx) => {
  let { email } = argv;

  email = email.replace(/@/, `+${Math.round(Math.random() * (10 ** 10))}@`);

  const signUpData = {
    client_id: 'lJDVb8s0468eDLucm9bxHGhoTm2DJPfA',
    email,
    password: argv.password,
    connection: 'Username-Password-Authentication',
    user_metadata: {
      given_name: argv.firstName,
      family_name: argv.lastName,
    },
  };

  ctx.logger.info(JSON.stringify(signUpData, null, 2));

  await fetch('https://8base-dev.auth0.com/dbconnections/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: 'lJDVb8s0468eDLucm9bxHGhoTm2DJPfA',
      email,
      password: argv.password,
      connection: 'Username-Password-Authentication',
      user_metadata: {
        given_name: argv.firstName,
        family_name: argv.lastName,
      },
    }),
  });

  ctx.logger.info('Sign up is successful');

  const inbox = new TestInbox({
    host: argv.host,
    user: argv.email,
    password: argv.password,
  });

  await inbox.connect();

  const message = await inbox.findOne({ to: email, subject: 'Welcome to 8base' }, { timeout: 180000 });

  const confirmUrl = message.html.match(/\shref="([^"]+)"[^<]+Confirm Email Address</)[1];

  ctx.logger.info(`Confirm url: ${confirmUrl}`);

  await inbox.close();

  const res = await fetch(confirmUrl);

  ctx.logger.info('Confirmation is successful');
};
