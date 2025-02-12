export interface UpdateOneAdapter<TCommand, TContext = void> {
  updateOne(command: TCommand, context: TContext): Promise<void>;
}
