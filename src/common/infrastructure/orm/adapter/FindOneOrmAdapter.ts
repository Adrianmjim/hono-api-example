import { SQL } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { PgTable } from 'drizzle-orm/pg-core';

import { FindOneAdapter } from '../../../domain/adapter/FindOneAdapter';
import { Converter } from '../../../domain/converter/Converter';
import { Query } from '../../../domain/model/Query';
import { Inject } from '../../injection/Inject';
import { Injectable } from '../../injection/Injectable';
import { InjectionKeys } from '../../injection/InjectionKeys';
import * as schema from '../model/schema';

@Injectable()
export class FindOneOrmAdapter<TQuery extends Query, TModel, TModelDb> implements FindOneAdapter<TQuery, TModel> {
  public constructor(
    @Inject(InjectionKeys.database)
    private readonly db: NeonHttpDatabase<typeof schema>,
    @Inject(InjectionKeys.table)
    private readonly table: PgTable,
    @Inject(InjectionKeys.modelDbToModelConverter)
    private readonly modelDbToModelConverter: Converter<TModelDb, TModel>,
    @Inject(InjectionKeys.findQueryToFindQueryOrmConverter)
    private readonly findQueryToFindQueryOrmConverter: Converter<TQuery, SQL | undefined>,
  ) {}

  public async findOne(query: TQuery): Promise<TModel | undefined> {
    const findQueryOrm: SQL | undefined = this.findQueryToFindQueryOrmConverter.convert(query);

    const modelDb: unknown = (await this.db.select().from(this.table).where(findQueryOrm).limit(1))[0];

    let model: TModel | undefined = undefined;

    if (modelDb !== undefined) {
      model = this.modelDbToModelConverter.convert(modelDb as TModelDb);
    }

    return model;
  }
}
