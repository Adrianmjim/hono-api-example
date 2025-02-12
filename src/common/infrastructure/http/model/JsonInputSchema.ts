import { z } from 'zod';

export interface JsonInputSchema<T extends z.ZodType> {
  in: {
    json: z.input<T>;
  };
  out: {
    json: z.infer<T>;
  };
}
