import type { z } from 'zod';
import type { IErrorHandler } from './error';
import { HttpExceptionHandler } from './error';
import type { ParsableApiRequest, RequestSchema } from './types';
import { mapRequestSchemaToZod } from './utils';

export class ZodRequest<T extends RequestSchema> {
  constructor(private schema: T, private errorHandler?: IErrorHandler) {}
  parse = (
    req: ParsableApiRequest
  ): z.infer<ReturnType<typeof mapRequestSchemaToZod<T>>> => {
    const all = mapRequestSchemaToZod<T>(this.schema);
    const result = all.safeParse(req);
    if (result.success) {
      return result.data;
    }
    if (!this.errorHandler) {
      new HttpExceptionHandler().process(result.error);
    }
    throw result.error;
  };
}
