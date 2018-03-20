module.exports = async (argv, ctx) => {
  const response = await ctx.client.confirm({
    email: argv.email,
    password: argv.password,
    code: argv.code,
  });

  if (argv.save) {
    ctx.store.set('auth.email', argv.email);
    ctx.store.set('auth.organizationId', '1');
    ctx.store.set('auth.accountId', response.accounts[0].account);
    ctx.store.set('auth.token', response.auth.idToken);
  }
};
