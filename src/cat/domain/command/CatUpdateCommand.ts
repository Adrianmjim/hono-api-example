import { CatSetCommand } from './CatSetCommand';
import { UpdateCommand } from '../../../common/domain/model/UpdateCommand';
import { CatFindQuery } from '../query/CatFindQuery';

export interface CatUpdateCommand extends UpdateCommand<CatFindQuery, CatSetCommand> {}
