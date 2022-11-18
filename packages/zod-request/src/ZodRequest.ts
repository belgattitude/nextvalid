import type { z } from 'zod';
import type { IErrorHandler } from './error';
import { HttpExceptionHandler } from './error';
import type { ParsableApiRequest, ApiRequestSchema } from './types';
import { mapRequestSchemaToZod } from './utils';

const schemaDefaults = {
  method: 'GET',
  headers: {},
  query: {},
  cookies: {},
};

export class ZodRequest<T extends ApiRequestSchema> {
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
  static withSchemaDefaults = <T extends ApiRequestSchema>(
    schema: Partial<ApiRequestSchema>,
    defaults?: Partial<T>
  ) => {
    return new ZodRequest({
      ...(defaults ?? schemaDefaults),
      ...schema,
    } as T);
  };
}
