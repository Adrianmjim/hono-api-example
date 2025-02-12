import { BaseEntityOrm } from '../../../../common/infrastructure/orm/model/BaseEntityOrm';

export interface CatOrm extends BaseEntityOrm {
  bornDate: Date;
  name: string;
}
