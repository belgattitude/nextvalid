import type { z } from 'zod';
import type { IErrorHandler } from './error';
import { HttpExceptionHandler } from './error';
import type { ParsableRequest, RequestSchema } from './types';
import { mapRequestSchemaToZod } from './utils';

const schemaDefaults = {
  method: 'GET',
  headers: {},
  query: {},
  cookies: {},
} as const;

export class ZodGetServerSideProps<T extends RequestSchema> {
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
    return new ZodGetServerSideProps(
      {
        ...(defaults ?? schemaDefaults),
        ...schema,
      },
      errorHandler
    );
  };
}
