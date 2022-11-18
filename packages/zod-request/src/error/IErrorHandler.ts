import type { z } from 'zod';
export interface IErrorHandler {
  /**
   * @throws Error
   */
  process: (error: z.ZodError) => never;
}
