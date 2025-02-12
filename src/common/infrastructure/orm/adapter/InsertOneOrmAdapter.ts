import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { PgTable } from 'drizzle-orm/pg-core';

import { InsertOneAdapter } from '../../../domain/adapter/InsertOneAdapter';
import { Converter } from '../../../domain/converter/Converter';
import { Command } from '../../../domain/model/Command';
import { Inject } from '../../injection/Inject';
import { Injectable } from '../../injection/Injectable';
import { InjectionKeys } from '../../injection/InjectionKeys';
import { BaseEntityOrm } from '../model/BaseEntityOrm';
import * as schema from '../model/schema';

@Injectable()
export class InsertOneOrmAdapter<TCommand extends Command, TModel, TModelDb extends BaseEntityOrm>
  implements InsertOneAdapter<TCommand, TModel>
{
  public constructor(
    @Inject(InjectionKeys.database)
    private readonly db: NeonHttpDatabase<typeof schema>,
    @Inject(InjectionKeys.table)
    private readonly table: PgTable,
    @Inject(InjectionKeys.modelDbToModelConverter)
    private readonly modelDbToModelConverter: Converter<TModelDb, TModel>,
    @Inject(InjectionKeys.insertOneCommandToInsertOneQueryOrmConverter)
    private readonly insertOneCommandToInsertOneQueryOrmConverter: Converter<TCommand, TModelDb>,
  ) {}

  public async insertOne(command: TCommand): Promise<TModel> {
    const insertOneQueryOrm: TModelDb = this.insertOneCommandToInsertOneQueryOrmConverter.convert(command);

    const modelDbs: unknown[] = await this.db.insert(this.table).values(insertOneQueryOrm).returning();

    const model: TModel = this.modelDbToModelConverter.convert(modelDbs[0]! as TModelDb);

    return model;
  }
}
