const { GraphQLClient } = require('graphql-request');
const logger = require('./logger');
const generators = require('./generators');

class Client {
  setUrl(url) {
    this.url = url;
  }

  setAuthorization(authorization) {
    this.authorization = authorization;
  }

  setAccountId(accountId) {
    this.accountId = accountId;
  }

  setOrganizationId(organizationId) {
    this.organizationId = organizationId;
  }

  constructor({
    url,
    authorization = '',
    accountId = '',
    organizationId = '',
  } = {}) {
    this.setUrl(url);
    this.setAuthorization(authorization);
    this.setAccountId(accountId);
    this.setOrganizationId(organizationId);
    this.updateEnvironment();
  }

  updateEnvironment() {
    const {
      url, authorization, accountId, organizationId,
    } = this;

    const headers = {};

    headers.Authorization = authorization;
    headers['account-id'] = accountId;
    headers['organization-id'] = organizationId;

    this.gqlc = new GraphQLClient(url, { headers });
  }

  async execute(request, variables = {}) {
    logger.info(' Request \n', 'inverse');
    logger.info(request);
    logger.info('\n with variables \n', 'inverse');
    logger.info(JSON.stringify(variables, null, 2));

    let response;

    try {
      response = await this.gqlc.request(request, variables);
    } catch (err) {
      logger.err('\n Response \n', 'inverse');
      logger.err(`${JSON.stringify(err, null, 2)}\n`);
    }

    if (response) {
      logger.info('\n Response \n', 'inverse');
      logger.info(`${JSON.stringify(response, null, 2)}\n`);
    }

    return response || {};
  }

  async signUp(data) {
    const request = generators.signUpRequest();

    const response = await this.execute(request, { data });

    return response.userSignUp;
  }

  async confirm(data) {
    const request = generators.confirmRequest();

    const response = await this.execute(request, { data });

    return response.userSignUpConfirm;
  }

  async login(data) {
    const request = generators.loginRequest();

    const response = await this.execute(request, { data });

    return response.userLogin;
  }

  async getTables(onlyUsers) {
    const request = generators.getTablesRequest(onlyUsers);

    const response = await this.execute(request);

    return response.tablesList;
  }

  async createTable(data) {
    const request = generators.createTableRequest();

    const response = await this.execute(request, { data });

    return response.tableCreate;
  }

  async deleteTable(id) {
    const request = generators.deleteTableRequest(id);

    const response = await this.execute(request);

    return response.success;
  }

  async createField(data) {
    const request = generators.createFieldRequest();

    const variables = {
      data,
    };

    const response = await this.execute(request, variables);

    return response.fieldCreate;
  }

  async createEntity(tableName, data) {
    const request = generators.createEntityRequest(tableName);

    const variables = {
      data,
    };

    const response = await this.execute(request, variables);

    return response.data;
  }

  async exportSchema() {
    const request = generators.exportSchemaRequest();

    const response = await this.execute(request);

    return response;
  }
}

module.exports = Client;
