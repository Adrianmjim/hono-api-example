import { neon } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { Container } from 'inversify';

import { InjectionKeys } from './InjectionKeys';
import { DeleteOrmAdapter } from '../orm/adapter/DeleteOrmAdapter';
import { FindOneOrmAdapter } from '../orm/adapter/FindOneOrmAdapter';
import { FindOrmAdapter } from '../orm/adapter/FindOrmAdapter';
import { InsertOneOrmAdapter } from '../orm/adapter/InsertOneOrmAdapter';
import { UpdateOrmAdapter } from '../orm/adapter/UpdateOrmAdapter';
import { UpdateCommandToFindQueryOrmConverter } from '../orm/converter/UpdateCommandToFindQueryOrmConverter';
import { UpdateCommandToSetQueryOrmConverter } from '../orm/converter/UpdateCommandToSetQueryOrmConverter';

export const commonModule: Container = new Container({ defaultScope: 'Singleton' });

commonModule
  .bind(InjectionKeys.database)
  .toResolvedValue(
    (databaseUrl: string): NeonHttpDatabase => drizzle({ client: neon(databaseUrl) }),
    [InjectionKeys.databaseUrl],
  );
commonModule.bind(InjectionKeys.deleteOrmAdapter).to(DeleteOrmAdapter);
commonModule.bind(InjectionKeys.findOneOrmAdapter).to(FindOneOrmAdapter);
commonModule.bind(InjectionKeys.findOrmAdapter).to(FindOrmAdapter);
commonModule.bind(InjectionKeys.insertOneOrmAdapter).to(InsertOneOrmAdapter);
commonModule.bind(InjectionKeys.updateCommandToFindQueryOrmConverter).to(UpdateCommandToFindQueryOrmConverter);
commonModule.bind(InjectionKeys.updateCommandToSetQueryOrmConverter).to(UpdateCommandToSetQueryOrmConverter);
commonModule.bind(InjectionKeys.updateOrmAdapter).to(UpdateOrmAdapter);
