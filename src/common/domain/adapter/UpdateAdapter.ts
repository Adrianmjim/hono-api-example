export interface UpdateAdapter<TCommand, TContext = void> {
  update(command: TCommand, context: TContext): Promise<void>;
}
