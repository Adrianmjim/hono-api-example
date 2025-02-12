import { BaseEntity } from './BaseEntity';

export interface Cat extends BaseEntity {
  bornDate: Date;
  name: string;
}
