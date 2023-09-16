import type { z } from 'zod';
import { HttpExceptionHandler, type IErrorHandler } from './error';
import type { ParsableRequest, RequestSchema } from './types';
import { mapRequestSchemaToZod } from './utils';

const schemaDefaults = {
  method: 'GET',
  query: {},
  headers: {},
  cookies: {},
} as const;

export class ZodRequest<T extends RequestSchema> {
  constructor(
    public readonly schema: T,
    private errorHandler?: IErrorHandler
  ) {}
  parse = (
    req: ParsableRequest
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
  static create = <S extends Partial<RequestSchema>>(params: {
    schema: S;
    errorHandler?: IErrorHandler;
    defaults?: RequestSchema;
  }) => {
    const { schema, errorHandler, defaults } = params;
    return new ZodRequest(
      {
        ...(defaults ?? schemaDefaults),
        ...schema,
      },
      errorHandler
    );
  };
}
