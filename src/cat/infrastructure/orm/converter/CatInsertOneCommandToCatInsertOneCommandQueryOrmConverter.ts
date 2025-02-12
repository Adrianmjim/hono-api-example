import { Injectable } from '../../../../common/infrastructure/injection/Injectable';
import { InsertOneCommandToInsertOneQueryOrmConverter } from '../../../../common/infrastructure/orm/converter/InsertOneCommandToInsertOneQueryOrmConverter';
import { BaseEntityOrm } from '../../../../common/infrastructure/orm/model/BaseEntityOrm';
import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';
import { CatOrm } from '../model/CatOrm';

@Injectable()
export class CatInsertOneCommandToCatInsertOneCommandQueryOrmConverter extends InsertOneCommandToInsertOneQueryOrmConverter<
  CatInsertOneCommand,
  CatOrm
> {
  protected override convertToEntity(baseEntityOrm: BaseEntityOrm, command: CatInsertOneCommand): CatOrm {
    const catOrm: CatOrm = {
      ...baseEntityOrm,
      bornDate: command.bornDate,
      name: command.name,
    };

    return catOrm;
  }
}
