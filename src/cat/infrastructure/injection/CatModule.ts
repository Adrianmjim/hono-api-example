import { Container } from 'inversify';

import { commonModule } from '../../../common/infrastructure/injection/CommonModule';
import { InjectionKeys } from '../../../common/infrastructure/injection/InjectionKeys';
import { catsTable } from '../../../common/infrastructure/orm/model/schema';
import { CatFindQueryToCatFindQueryOrmConverter } from '../orm/converter/CatFindQueryToCatFindQueryOrmConverter';
import { CatInsertOneCommandToCatInsertOneCommandQueryOrmConverter } from '../orm/converter/CatInsertOneCommandToCatInsertOneCommandQueryOrmConverter';
import { CatOrmToCatConverter } from '../orm/converter/CatOrmToCat';
import { CatSetCommandToCatSetQueryOrmConverter } from '../orm/converter/CatSetCommandToCatSetQueryOrmConverter';

export const catModule: Container = new Container({ defaultScope: 'Singleton', parent: commonModule });

catModule.bind(InjectionKeys.table).toConstantValue(catsTable);

catModule.bind(InjectionKeys.modelDbToModelConverter).to(CatOrmToCatConverter);
catModule.bind(InjectionKeys.findQueryToFindQueryOrmConverter).to(CatFindQueryToCatFindQueryOrmConverter);
catModule.bind(InjectionKeys.setCommandToSetQueryOrmConverter).to(CatSetCommandToCatSetQueryOrmConverter);
catModule
  .bind(InjectionKeys.insertOneCommandToInsertOneQueryOrmConverter)
  .to(CatInsertOneCommandToCatInsertOneCommandQueryOrmConverter);
