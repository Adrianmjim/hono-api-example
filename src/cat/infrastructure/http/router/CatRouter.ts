import { Context, Hono } from 'hono';

import { Bindings } from '../../../../common/infrastructure/http/model/Bindings';
import { JsonInputSchema } from '../../../../common/infrastructure/http/model/JsonInputSchema';
import { zValidator } from '../../../../common/infrastructure/http/model/zvalidator';
import { InjectionKeys } from '../../../../common/infrastructure/injection/InjectionKeys';
import { DeleteOrmAdapter } from '../../../../common/infrastructure/orm/adapter/DeleteOrmAdapter';
import { FindOneOrmAdapter } from '../../../../common/infrastructure/orm/adapter/FindOneOrmAdapter';
import { FindOrmAdapter } from '../../../../common/infrastructure/orm/adapter/FindOrmAdapter';
import { InsertOneOrmAdapter } from '../../../../common/infrastructure/orm/adapter/InsertOneOrmAdapter';
import { UpdateOrmAdapter } from '../../../../common/infrastructure/orm/adapter/UpdateOrmAdapter';
import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { Cat } from '../../../domain/model/Cat';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { catModule } from '../../injection/CatModule';
import { CatOrm } from '../../orm/model/CatOrm';
import { createCatHttpRequestSchema } from '../model/CreateCatHttpRequest';
import { updateCatHttpRequestSchema } from '../model/UpdateCatHttpRequest';

export const catRouter: Hono = new Hono();

catRouter.post(
  '/',
  zValidator('json', createCatHttpRequestSchema),
  async (ctx: Context<{ Bindings: Bindings }, string, JsonInputSchema<typeof createCatHttpRequestSchema>>) => {
    const insertOneCatOrmAdapter: InsertOneOrmAdapter<CatInsertOneCommand, Cat, CatOrm> = catModule.get(
      InjectionKeys.insertOneOrmAdapter,
    );

    const cat: Cat = await insertOneCatOrmAdapter.insertOne({
      bornDate: ctx.req.valid('json').bornDate,
      name: ctx.req.valid('json').name,
    });

    return ctx.json(cat, 201);
  },
);

catRouter.get('/', async (ctx: Context<{ Bindings: Bindings }>) => {
  const findCatOrmAdapter: FindOrmAdapter<CatFindQuery, Cat, CatOrm> = catModule.get(InjectionKeys.findOrmAdapter);

  const cats: Cat[] = await findCatOrmAdapter.find({ name: ctx.req.query('name')! });

  return ctx.json(cats);
});

catRouter.get('/:id', async (ctx: Context<{ Bindings: Bindings }>) => {
  const findOneCatOrmAdapter: FindOneOrmAdapter<CatFindQuery, Cat, CatOrm> = catModule.get(
    InjectionKeys.findOneOrmAdapter,
  );

  const cat: Cat | undefined = await findOneCatOrmAdapter.findOne({ id: ctx.req.param('id') });

  if (cat === undefined) {
    return ctx.json({ message: 'Cat not found' }, 404);
  }

  return ctx.json(cat);
});

catRouter.delete('/:id', async (ctx: Context<{ Bindings: Bindings }>) => {
  const findOneCatOrmAdapter: FindOneOrmAdapter<CatFindQuery, Cat, CatOrm> = catModule.get(
    InjectionKeys.findOneOrmAdapter,
  );

  const cat: Cat | undefined = await findOneCatOrmAdapter.findOne({ id: ctx.req.param('id') });

  if (cat === undefined) {
    return ctx.json({ message: 'Cat not found' }, 404);
  }

  const deleteCatOrmAdapter: DeleteOrmAdapter<CatFindQuery> = catModule.get(InjectionKeys.deleteOrmAdapter);

  await deleteCatOrmAdapter.delete({ id: ctx.req.param('id') });

  return ctx.body(null, 204);
});

catRouter.patch(
  '/:id',
  zValidator('json', updateCatHttpRequestSchema),
  async (ctx: Context<{ Bindings: Bindings }, '/:id', JsonInputSchema<typeof updateCatHttpRequestSchema>>) => {
    const findOneCatOrmAdapter: FindOneOrmAdapter<CatFindQuery, Cat, CatOrm> = catModule.get(
      InjectionKeys.findOneOrmAdapter,
    );

    const cat: Cat | undefined = await findOneCatOrmAdapter.findOne({ id: ctx.req.param('id') });

    if (cat === undefined) {
      return ctx.json({ message: 'Cat not found' }, 404);
    }

    const updateCatOrmAdapter: UpdateOrmAdapter<CatUpdateCommand> = catModule.get(InjectionKeys.updateOrmAdapter);

    await updateCatOrmAdapter.update({
      findQuery: { id: ctx.req.param('id') },
      setCommand: {
        bornDate: ctx.req.valid('json').bornDate!,
        name: ctx.req.valid('json').name!,
      },
    });

    return ctx.body(null, 204);
  },
);
