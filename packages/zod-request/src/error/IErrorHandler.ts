import type { z } from 'zod';
export interface IErrorHandler {
  process: (error: z.ZodError) => void;
}
