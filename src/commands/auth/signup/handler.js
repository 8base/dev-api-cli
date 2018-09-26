module.exports = async (argv, ctx) => {
  await ctx.client.signUp({
    firstName: argv.firstName,
    lastName: argv.lastName,
    workspace: argv.workspace,
    email: argv.email,
    password: argv.password,
  });
};
