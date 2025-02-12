import { Command } from '../../../common/domain/model/Command';

export interface CatInsertOneCommand extends Command {
  bornDate: Date;
  name: string;
}
