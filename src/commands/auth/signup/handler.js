module.exports = async (argv, ctx) => {
  await ctx.client.signUp({
    firstName: argv.firstName,
    lastName: argv.lastName,
    organization: argv.organization,
    email: argv.email,
    password: argv.password,
  });
};
