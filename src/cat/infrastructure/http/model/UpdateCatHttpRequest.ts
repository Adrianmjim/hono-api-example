import { z } from 'zod';

export const updateCatHttpRequestSchema = z.object({
  bornDate: z.coerce.date().optional(),
  name: z.string().optional(),
});
