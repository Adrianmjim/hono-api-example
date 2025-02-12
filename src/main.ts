import { Context, Hono, Next } from 'hono';
import { cors } from 'hono/cors';

import { catRouter } from './cat/infrastructure/http/router/CatRouter.js';
import { Bindings } from './common/infrastructure/http/model/Bindings';
import { commonModule } from './common/infrastructure/injection/CommonModule';
import { InjectionKeys } from './common/infrastructure/injection/InjectionKeys';

const app: Hono = new Hono();

app.use(cors());
app.use(async (ctx: Context<{ Bindings: Bindings }>, next: Next) => {
  try {
    commonModule.get(InjectionKeys.databaseUrl);
  } catch {
    commonModule.bind(InjectionKeys.databaseUrl).toConstantValue(ctx.env.DATABASE_URL);
  }
  await next();
});

app.get('/', (c: Context) => {
  return c.text('ok');
});

app.route('/cats', catRouter);

export default app;
