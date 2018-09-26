const signUpRequest = () => `mutation UserSignUp($data: UserRegistrationInput!) {
  userSignUp(data: $data) {
    workspace
  }
}`;

const confirmRequest = () => `mutation UserSignUpConfirm($data: UserSignUpConfirmInput!) {
  userSignUpConfirm(data: $data) {
    auth {
      idToken
    }
    workspaces {
      workspace
    }
  }
}`;

const loginRequest = () => `mutation Login($data: UserLoginInput!) {
  userLogin(data: $data) {
    auth {
      idToken
    }
    workspaces {
      workspace
    }
  }
}`;

const getTablesRequest = onlyUsers => `query GetTables {
  tablesList(filter: { onlyUserTables: ${onlyUsers ? 'true' : 'false'} }) {
    id
    name
    isSystem
    fields {
      name
      fieldType
    }
  }
}`;

const createTableRequest = () => `mutation CreateTable($data: TableCreateInput) {
  tableCreate(data: $data) {
    id
  }
}`;

const deleteTableRequest = id => `mutation DeleteTable {
  tableDelete(id: "${id}") {
    success
  }
}`;

const createFieldRequest = () => `mutation CreateField($data: TableFieldCreateInput) {
  fieldCreate(data: $data) {
    id
  }
}`;

const createEntityRequest = tableName => `mutation ${tableName}Create($data: ${tableName}CreateInput) {
  data:${tableName}Create(data: $data) {
    id
  }
}`;

const exportSchemaRequest = () => `query ExportSchema {
  tables: tablesList(filter: { onlyUserTables: true }) {
    ...TableFragment
  }
}

fragment TableFragment on Table {
  id
  name
  displayName
  isSystem
  fields {
    id
    name
    displayName
    description
    fieldType
    fieldTypeAttributes {
      id
      ...TextFieldTypeAttributes
      ...NumberFieldTypeAttributes
      ...FileFieldTypeAttributes
      ...DateFieldTypeAttributes
      ...SwitchFieldTypeAttributes
    }
    isList
    isRequired
    isUnique
    defaultValue
    relation {
      id
      refFieldIsList
      refFieldIsRequired
      refFieldName
      refFieldDisplayName
      refTable {
        name
      }
    }
  }
}

fragment DateFieldTypeAttributes on DateFieldTypeAttributes {
  format
}

fragment TextFieldTypeAttributes on TextFieldTypeAttributes {
  format
  fieldSize
}

fragment NumberFieldTypeAttributes on NumberFieldTypeAttributes {
  format
  precision
  currency
  minValue
  maxValue
}

fragment FileFieldTypeAttributes on FileFieldTypeAttributes {
  format
  showTitle
  showUrl
  maxSize
  typeRestrictions
}

fragment SwitchFieldTypeAttributes on SwitchFieldTypeAttributes {
  format
  listOptions
}`;

module.exports = {
  signUpRequest,
  confirmRequest,
  loginRequest,
  getTablesRequest,
  createTableRequest,
  deleteTableRequest,
  createFieldRequest,
  createEntityRequest,
  exportSchemaRequest,
};
