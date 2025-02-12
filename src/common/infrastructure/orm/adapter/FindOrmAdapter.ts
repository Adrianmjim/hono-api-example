import { SQL } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { PgTable } from 'drizzle-orm/pg-core';

import { FindAdapter } from '../../../domain/adapter/FindAdapter';
import { Converter } from '../../../domain/converter/Converter';
import { Query } from '../../../domain/model/Query';
import { Inject } from '../../injection/Inject';
import { Injectable } from '../../injection/Injectable';
import { InjectionKeys } from '../../injection/InjectionKeys';
import * as schema from '../model/schema';

@Injectable()
export class FindOrmAdapter<TQuery extends Query, TModel, TModelDb> implements FindAdapter<TQuery, TModel> {
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

  public async find(query: TQuery): Promise<TModel[]> {
    const findQueryOrm: SQL | undefined = this.findQueryToFindQueryOrmConverter.convert(query);

    const modelDbs: unknown[] = await this.db.select().from(this.table).where(findQueryOrm);

    const models: TModel[] = modelDbs.map((modelDb: unknown) =>
      this.modelDbToModelConverter.convert(modelDb as TModelDb),
    );

    return models;
  }
}
