import { and, eq, SQL } from 'drizzle-orm';

import { Converter } from '../../../../common/domain/converter/Converter';
import { Injectable } from '../../../../common/infrastructure/injection/Injectable';
import { catsTable } from '../../../../common/infrastructure/orm/model/schema';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';

@Injectable()
export class CatFindQueryToCatFindQueryOrmConverter implements Converter<CatFindQuery, SQL | undefined> {
  public convert(query: CatFindQuery): SQL | undefined {
    const whereConditions = [];

    if (query.id !== undefined) {
      whereConditions.push(eq(catsTable.id, query.id));
    }

    if (query.name !== undefined) {
      whereConditions.push(eq(catsTable.name, query.name));
    }

    let catFindQueryOrm: SQL | undefined = undefined;

    if (whereConditions.length > 0) {
      catFindQueryOrm = and(...whereConditions);
    }

    return catFindQueryOrm;
  }
}
