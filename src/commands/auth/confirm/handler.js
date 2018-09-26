module.exports = async (argv, ctx) => {
  const response = await ctx.client.confirm({
    email: argv.email,
    password: argv.password,
    code: argv.code,
  });

  if (argv.save) {
    ctx.store.set('auth.email', argv.email);
    ctx.store.set('auth.workspaceId', response.workspaces[0].workspace);
    ctx.store.set('auth.token', response.auth.idToken);
  }
};
