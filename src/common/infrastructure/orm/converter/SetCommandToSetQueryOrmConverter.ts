import { PgUpdateSetSource, PgTable } from 'drizzle-orm/pg-core';

import { Converter } from '../../../domain/converter/Converter';
import { Command } from '../../../domain/model/Command';
import { Injectable } from '../../injection/Injectable';

@Injectable()
export abstract class SetCommandToSetQueryOrmConverter<
  TInput extends Command,
  TOutput extends PgUpdateSetSource<PgTable>,
> implements Converter<TInput, TOutput>
{
  public convert(input: TInput): TOutput {
    const setQueryOrm: PgUpdateSetSource<PgTable> = {
      updatedAt: new Date(),
    };

    const output: TOutput = this.convertToSetQueryOrm(setQueryOrm, input);

    return output;
  }

  protected abstract convertToSetQueryOrm(setQueryOrm: PgUpdateSetSource<PgTable>, input: TInput): TOutput;
}
