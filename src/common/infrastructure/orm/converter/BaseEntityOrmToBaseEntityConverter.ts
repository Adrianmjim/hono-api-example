import { BaseEntity } from '../../../../cat/domain/model/BaseEntity';
import { Converter } from '../../../domain/converter/Converter';
import { Injectable } from '../../injection/Injectable';
import { BaseEntityOrm } from '../model/BaseEntityOrm';

@Injectable()
export abstract class BaseEntityOrmToBaseEntityConverter<TInput extends BaseEntityOrm, TOutput extends BaseEntity>
  implements Converter<TInput, TOutput>
{
  public convert(input: TInput): TOutput {
    const baseEntity: BaseEntity = {
      createdAt: input.createdAt,
      id: input.id,
    };

    if (input.updatedAt !== null) {
      baseEntity.updatedAt = input.updatedAt;
    }

    const output: TOutput = this.convertToEntity(baseEntity, input);

    return output;
  }

  protected abstract convertToEntity(baseEntity: BaseEntity, input: TInput): TOutput;
}
