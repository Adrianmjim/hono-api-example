import { Query } from '../../../common/domain/model/Query';

export interface CatFindQuery extends Query {
  id?: string;
  name?: string;
}
