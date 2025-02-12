import { Command } from '../../../common/domain/model/Command';

export interface CatSetCommand extends Command {
  bornDate?: Date;
  name?: string;
}
