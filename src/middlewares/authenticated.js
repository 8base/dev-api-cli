const createAuthenticatedHandler = handler => (argv, ctx) => {
  ctx.client.setAuthorization(ctx.store.get('auth.token'));
  ctx.client.setWorkspaceId(ctx.store.get('auth.workspaceId'));
  ctx.client.updateEnvironment();

  return handler(argv, ctx);
};

module.exports = module => ({
  ...module,
  handler: createAuthenticatedHandler(module.handler),
});
