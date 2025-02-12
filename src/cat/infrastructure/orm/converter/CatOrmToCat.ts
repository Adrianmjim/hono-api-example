import { Injectable } from '../../../../common/infrastructure/injection/Injectable';
import { BaseEntityOrmToBaseEntityConverter } from '../../../../common/infrastructure/orm/converter/BaseEntityOrmToBaseEntityConverter';
import { BaseEntity } from '../../../domain/model/BaseEntity';
import { Cat } from '../../../domain/model/Cat';
import { CatOrm } from '../model/CatOrm';

@Injectable()
export class CatOrmToCatConverter extends BaseEntityOrmToBaseEntityConverter<CatOrm, Cat> {
  protected override convertToEntity(baseEntity: BaseEntity, input: CatOrm): Cat {
    const cat: Cat = {
      ...baseEntity,
      bornDate: input.bornDate,
      id: input.id,
      name: input.name,
    };

    return cat;
  }
}
