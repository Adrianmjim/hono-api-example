export interface DeleteAdapter<TCommand> {
  delete(command: TCommand): Promise<void>;
}
