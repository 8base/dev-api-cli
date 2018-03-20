const signUpRequest = () => `mutation UserSignUp($data: UserRegistrationInput!) {
  userSignUp(data: $data) {
    account
  }
}`;

const confirmRequest = () => `mutation UserSignUpConfirm($data: UserSignUpConfirmInput!) {
  userSignUpConfirm(data: $data) {
    auth {
      idToken
    }
    accounts {
      account
    }
  }
}`;

const loginRequest = () => `mutation Login($data: UserLoginInput!) {
  userLogin(data: $data) {
    auth {
      idToken
    }
    accounts {
      account
    }
  }
}`;

const getTablesRequest = () => `query GetTables {
  tableList(data: { onlyUserTables: true }) {
    id
    name
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
  tables: tablesList(data: { onlyUserTables: true}) {
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
      relationTableName
      relationFieldName
      refTable {
        id
      }
      refFieldIsList
      refFieldIsRequired
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
