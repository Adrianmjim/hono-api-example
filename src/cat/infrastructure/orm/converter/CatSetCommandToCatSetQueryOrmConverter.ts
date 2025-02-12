import { PgUpdateSetSource, PgTable } from 'drizzle-orm/pg-core';

import { Injectable } from '../../../../common/infrastructure/injection/Injectable';
import { SetCommandToSetQueryOrmConverter } from '../../../../common/infrastructure/orm/converter/SetCommandToSetQueryOrmConverter';
import { CatSetCommand } from '../../../domain/command/CatSetCommand';

@Injectable()
export class CatSetCommandToCatSetQueryOrmConverter extends SetCommandToSetQueryOrmConverter<
  CatSetCommand,
  PgUpdateSetSource<PgTable>
> {
  protected override convertToSetQueryOrm(
    setQueryOrm: PgUpdateSetSource<PgTable>,
    input: CatSetCommand,
  ): PgUpdateSetSource<PgTable> {
    const output: PgUpdateSetSource<PgTable> = {
      ...setQueryOrm,
      bornDate: input.bornDate,
      name: input.name,
    };

    return output;
  }
}
