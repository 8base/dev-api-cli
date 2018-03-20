const TestInbox = require('test-inbox');

module.exports = async (argv, ctx) => {
  let { email } = argv;

  email = email.replace(/@/, `+${Math.round(Math.random() * (10 ** 10))}@`);

  await ctx.client.signUp({
    firstName: argv.firstName,
    lastName: argv.lastName,
    organization: argv.organization,
    email,
    password: argv.password,
  });

  const inbox = new TestInbox({
    host: argv.host,
    user: argv.email,
    password: argv.password,
  });

  await inbox.connect();

  const message = await inbox.findOne({ to: email, subject: 'Welcome to 8base' }, { timeout: 180000 });

  const code = message.html.match(/code=([\d]+)/)[1];

  await inbox.close();

  const response = await ctx.client.confirm({
    email,
    password: argv.password,
    code,
  });

  if (argv.save) {
    ctx.store.set('auth.email', email);
    ctx.store.set('auth.organizationId', '1');
    ctx.store.set('auth.accountId', response.accounts[0].account);
    ctx.store.set('auth.token', response.auth.idToken);
  }
};
