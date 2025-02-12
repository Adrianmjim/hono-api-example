import { randomUUID } from 'crypto';

import { Converter } from '../../../domain/converter/Converter';
import { Command } from '../../../domain/model/Command';
import { Injectable } from '../../injection/Injectable';
import { BaseEntityOrm } from '../model/BaseEntityOrm';

@Injectable()
export abstract class InsertOneCommandToInsertOneQueryOrmConverter<
  TInput extends Command,
  TOutput extends BaseEntityOrm,
> implements Converter<TInput, TOutput>
{
  public convert(input: TInput): TOutput {
    const baseEntityOrm: BaseEntityOrm = {
      createdAt: new Date(),
      id: randomUUID(),
      updatedAt: null,
    };

    const modelDb: TOutput = this.convertToEntity(baseEntityOrm, input);

    return modelDb;
  }

  protected abstract convertToEntity(baseEntityOrm: BaseEntityOrm, input: TInput): TOutput;
}
