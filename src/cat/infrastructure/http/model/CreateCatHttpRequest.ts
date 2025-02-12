import { z } from 'zod';

export const createCatHttpRequestSchema = z.object({
  bornDate: z.coerce.date(),
  name: z.string(),
});
