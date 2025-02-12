import { Env, ValidationTargets, TypedResponse, Input, MiddlewareHandler, Context } from 'hono';
import { validator } from 'hono/validator';
import { z, ZodError, ZodSchema, ZodObject } from 'zod';

export type Hook<
  T,
  TE extends Env,
  TP extends string,
  TTarget extends keyof ValidationTargets = keyof ValidationTargets,
  TO = {},
> = (
  result: ({ success: true; data: T } | { success: false; error: ZodError; data: T }) & {
    target: TTarget;
  },
  c: Context<TE, TP>,
) => Response | void | TypedResponse<TO> | Promise<Response | void | TypedResponse<TO>>;

type HasUndefined<T> = undefined extends T ? true : false;

export const zValidator = <
  T extends ZodSchema,
  TTarget extends keyof ValidationTargets,
  TE extends Env,
  TP extends string,
  TIn = z.input<T>,
  TOut = z.output<T>,
  TI extends Input = {
    in: HasUndefined<TIn> extends true
      ? {
          [K in TTarget]?: TIn extends ValidationTargets[K] ? TIn : { [K2 in keyof TIn]?: ValidationTargets[K][K2] };
        }
      : {
          [K in TTarget]: TIn extends ValidationTargets[K] ? TIn : { [K2 in keyof TIn]: ValidationTargets[K][K2] };
        };
    out: Record<TTarget, TOut>;
  },
  TV extends TI = TI,
>(
  target: TTarget,
  schema: T,
  hook?: Hook<z.infer<T>, TE, TP, TTarget>,
): MiddlewareHandler<TE, TP, TV> =>
  // @ts-expect-error not typed well
  validator(target, async (value: {}, c: Context<TE, TP>) => {
    let validatorValue = value;

    // in case where our `target` === `header`, Hono parses all of the headers into lowercase.
    // this might not match the Zod schema, so we want to make sure that we account for that when parsing the schema.
    if (target === 'header' && schema instanceof ZodObject) {
      // create an object that maps lowercase schema keys to lowercase
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const schemaKeys = Object.keys(schema.shape);
      const caseInsensitiveKeymap = Object.fromEntries(schemaKeys.map((key: string) => [key.toLowerCase(), key]));

      validatorValue = Object.fromEntries(
        Object.entries(value).map(([key, value]: [string, unknown]) => [caseInsensitiveKeymap[key] ?? key, value]),
      );
    }

    const result = await schema.safeParseAsync(validatorValue);

    if (hook) {
      const hookResult = await hook({ data: validatorValue, ...result, target }, c);
      if (hookResult) {
        if (hookResult instanceof Response) {
          return hookResult;
        }

        if ('response' in hookResult) {
          return hookResult.response;
        }
      }
    }

    if (!result.success) {
      return c.json(result, 400);
    }

    return result.data as z.infer<T>;
  });
