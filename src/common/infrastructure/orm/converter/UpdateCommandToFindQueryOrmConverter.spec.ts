import { beforeAll, describe, expect, it, Mocked, vitest } from 'vitest';

import { SQL } from 'drizzle-orm';

import { UpdateCommandToFindQueryOrmConverter } from './UpdateCommandToFindQueryOrmConverter';
import { Converter } from '../../../domain/converter/Converter';
import { Query } from '../../../domain/model/Query';
import { UpdateCommand } from '../../../domain/model/UpdateCommand';

describe(UpdateCommandToFindQueryOrmConverter.name, () => {
  let findQueryToFindQueryOrmConverterMock: Mocked<Converter<Query, SQL | undefined>>;
  let updateCommandToFindQueryOrmConverter: UpdateCommandToFindQueryOrmConverter<UpdateCommand, SQL | undefined>;

  beforeAll(() => {
    findQueryToFindQueryOrmConverterMock = {
      convert: vitest.fn(),
    };

    updateCommandToFindQueryOrmConverter = new UpdateCommandToFindQueryOrmConverter(
      findQueryToFindQueryOrmConverterMock,
    );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let updateCommandFixture: UpdateCommand;
      let queryOrmFixture: SQL | undefined;
      let result: unknown;

      beforeAll(() => {
        updateCommandFixture = {
          findQuery: {},
          setCommand: {},
        };
        queryOrmFixture = undefined;

        findQueryToFindQueryOrmConverterMock.convert.mockReturnValueOnce(queryOrmFixture);

        result = updateCommandToFindQueryOrmConverter.convert(updateCommandFixture);
      });

      it('should call findQueryToFindQueryOrmConverter.convert()', () => {
        expect(findQueryToFindQueryOrmConverterMock.convert).toHaveBeenCalledTimes(1);
        expect(findQueryToFindQueryOrmConverterMock.convert).toHaveBeenCalledWith(updateCommandFixture.findQuery);
      });

      it('should return SQL | undefined', () => {
        expect(result).toBe(queryOrmFixture);
      });
    });
  });
});
