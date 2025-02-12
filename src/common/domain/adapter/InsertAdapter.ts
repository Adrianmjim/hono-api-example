export interface InsertAdapter<TCommand, TModel, TContext = void> {
  insert(command: TCommand, context: TContext): Promise<TModel[]>;
}
