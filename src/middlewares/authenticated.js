const createAuthenticatedHandler = handler => (argv, ctx) => {
  ctx.client.setAuthorization(ctx.store.get('auth.token'));
  ctx.client.setAccountId(ctx.store.get('auth.accountId'));
  ctx.client.setOrganizationId(ctx.store.get('auth.organizationId'));
  ctx.client.updateEnvironment();

  return handler(argv, ctx);
};

module.exports = module => ({
  ...module,
  handler: createAuthenticatedHandler(module.handler),
});
