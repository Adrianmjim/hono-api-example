import { SQL } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { PgUpdateSetSource, PgTable } from 'drizzle-orm/pg-core';

import { UpdateAdapter } from '../../../domain/adapter/UpdateAdapter';
import { Converter } from '../../../domain/converter/Converter';
import { UpdateCommand } from '../../../domain/model/UpdateCommand';
import { Inject } from '../../injection/Inject';
import { Injectable } from '../../injection/Injectable';
import { InjectionKeys } from '../../injection/InjectionKeys';
import * as schema from '../model/schema';

@Injectable()
export class UpdateOrmAdapter<TCommand extends UpdateCommand> implements UpdateAdapter<TCommand> {
  public constructor(
    @Inject(InjectionKeys.database)
    private readonly db: NeonHttpDatabase<typeof schema>,
    @Inject(InjectionKeys.table)
    private readonly table: PgTable,
    @Inject(InjectionKeys.updateCommandToFindQueryOrmConverter)
    private readonly updateCommandToFindQueryOrmConverter: Converter<TCommand, SQL | undefined>,
    @Inject(InjectionKeys.updateCommandToSetQueryOrmConverter)
    private readonly updateCommandToSetQueryOrmConverter: Converter<TCommand, PgUpdateSetSource<PgTable>>,
  ) {}

  public async update(command: TCommand): Promise<void> {
    const findQueryOrm: SQL | undefined = this.updateCommandToFindQueryOrmConverter.convert(command);
    const setQueryOrm: PgUpdateSetSource<PgTable> = this.updateCommandToSetQueryOrmConverter.convert(command);

    await this.db.update(this.table).set(setQueryOrm).where(findQueryOrm);
  }
}
