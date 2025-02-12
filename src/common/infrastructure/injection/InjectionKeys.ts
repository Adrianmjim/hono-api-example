export const InjectionKeys: {
  database: symbol;
  databaseUrl: symbol;
  deleteOrmAdapter: symbol;
  findOneOrmAdapter: symbol;
  findOrmAdapter: symbol;
  findQueryToFindQueryOrmConverter: symbol;
  insertOneCommandToInsertOneQueryOrmConverter: symbol;
  insertOneOrmAdapter: symbol;
  modelDbToModelConverter: symbol;
  setCommandToSetQueryOrmConverter: symbol;
  table: symbol;
  updateCommandToFindQueryOrmConverter: symbol;
  updateCommandToSetQueryOrmConverter: symbol;
  updateOrmAdapter: symbol;
} = {
  database: Symbol.for('database'),
  databaseUrl: Symbol.for('databaseUrl'),
  deleteOrmAdapter: Symbol.for('deleteOrmAdapter'),
  findOneOrmAdapter: Symbol.for('findOneOrmAdapter'),
  findOrmAdapter: Symbol.for('findOrmAdapter'),
  findQueryToFindQueryOrmConverter: Symbol.for('findQueryToFindQueryOrmConverter'),
  insertOneCommandToInsertOneQueryOrmConverter: Symbol.for('insertOneCommandToInsertOneQueryOrmConverter'),
  insertOneOrmAdapter: Symbol.for('insertOneOrmAdapter'),
  modelDbToModelConverter: Symbol.for('modelDbToModelConverter'),
  setCommandToSetQueryOrmConverter: Symbol.for('setCommandToSetQueryOrmConverter'),
  table: Symbol.for('table'),
  updateCommandToFindQueryOrmConverter: Symbol.for('updateCommandToFindQueryOrmConverter'),
  updateCommandToSetQueryOrmConverter: Symbol.for('updateCommandToSetQueryOrmConverter'),
  updateOrmAdapter: Symbol.for('updateOrmAdapter'),
};
