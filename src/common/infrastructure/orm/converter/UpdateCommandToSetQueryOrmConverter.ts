import { PgUpdateSetSource, PgTable } from 'drizzle-orm/pg-core';

import { Converter } from '../../../domain/converter/Converter';
import { Command } from '../../../domain/model/Command';
import { UpdateCommand } from '../../../domain/model/UpdateCommand';
import { Inject } from '../../injection/Inject';
import { Injectable } from '../../injection/Injectable';
import { InjectionKeys } from '../../injection/InjectionKeys';

@Injectable()
export class UpdateCommandToSetQueryOrmConverter<
  TInput extends UpdateCommand,
  TOutput extends PgUpdateSetSource<PgTable>,
> implements Converter<TInput, TOutput>
{
  public constructor(
    @Inject(InjectionKeys.setCommandToSetQueryOrmConverter)
    private readonly setCommandToSetQueryOrmConverter: Converter<Command, TOutput>,
  ) {}

  public convert(input: TInput): TOutput {
    return this.setCommandToSetQueryOrmConverter.convert(input.setCommand);
  }
}
