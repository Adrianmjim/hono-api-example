export interface InsertOneAdapter<TCommand, TModel, TContext = void> {
  insertOne(command: TCommand, context: TContext): Promise<TModel>;
}
