import { SQL } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { PgTable } from 'drizzle-orm/pg-core';

import { DeleteAdapter } from '../../../domain/adapter/DeleteAdapter';
import { Converter } from '../../../domain/converter/Converter';
import { Command } from '../../../domain/model/Command';
import { Inject } from '../../injection/Inject';
import { Injectable } from '../../injection/Injectable';
import { InjectionKeys } from '../../injection/InjectionKeys';
import * as schema from '../model/schema';

@Injectable()
export class DeleteOrmAdapter<TCommand extends Command> implements DeleteAdapter<TCommand> {
  public constructor(
    @Inject(InjectionKeys.database)
    private readonly db: NeonHttpDatabase<typeof schema>,
    @Inject(InjectionKeys.table)
    private readonly table: PgTable,
    @Inject(InjectionKeys.findQueryToFindQueryOrmConverter)
    private readonly deleteCommandToDeleteQueryOrmConverter: Converter<TCommand, SQL | undefined>,
  ) {}

  public async delete(command: TCommand): Promise<void> {
    const deleteQueryOrm: SQL | undefined = this.deleteCommandToDeleteQueryOrmConverter.convert(command);

    await this.db.delete(this.table).where(deleteQueryOrm);
  }
}
