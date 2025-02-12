import { Command } from './Command';
import { Query } from './Query';

export interface UpdateCommand<TQuery extends Query = Query, TCommand extends Command = Command> extends Command {
  findQuery: TQuery;
  setCommand: TCommand;
}
