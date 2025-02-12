import { SQL } from 'drizzle-orm';

import { Converter } from '../../../domain/converter/Converter';
import { Query } from '../../../domain/model/Query';
import { UpdateCommand } from '../../../domain/model/UpdateCommand';
import { Inject } from '../../injection/Inject';
import { Injectable } from '../../injection/Injectable';
import { InjectionKeys } from '../../injection/InjectionKeys';

@Injectable()
export class UpdateCommandToFindQueryOrmConverter<TInput extends UpdateCommand, TOutput extends SQL | undefined>
  implements Converter<TInput, TOutput>
{
  public constructor(
    @Inject(InjectionKeys.findQueryToFindQueryOrmConverter)
    private readonly findQueryToFindQueryOrmConverter: Converter<Query, TOutput>,
  ) {}

  public convert(input: TInput): TOutput {
    return this.findQueryToFindQueryOrmConverter.convert(input.findQuery);
  }
}
