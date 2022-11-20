import type { z } from 'zod';
import type { IErrorHandler } from './error';
import { HttpExceptionHandler } from './error';
import type { ServerSidePropsSchema, ParsableGsspContext } from './types';
import { mapServerSidePropsSchemaToZod } from './utils';

const schemaDefaults = {
  method: 'GET',
  cookies: {},
  headers: {},
  query: {},
  // locale: undefined,
};

export class ZodServerSideProps<T extends ServerSidePropsSchema> {
  constructor(
    public readonly schema: T,
    private errorHandler?: IErrorHandler
  ) {}
  parse = (
    context: ParsableGsspContext
  ): z.infer<ReturnType<typeof mapServerSidePropsSchemaToZod<T>>> => {
    const all = mapServerSidePropsSchemaToZod<T>(this.schema);
    const result = all.safeParse({
      method: context.req.method,
      headers: context.req.headers,
      cookies: context.req.cookies,
      query: context.query,
    });
    if (result.success) {
      return result.data;
    }
    if (!this.errorHandler) {
      new HttpExceptionHandler().process(result.error);
    }
    throw result.error;
  };
  static create = <S extends Partial<ServerSidePropsSchema>>(params: {
    schema: S;
    errorHandler?: IErrorHandler;
    defaults?: ServerSidePropsSchema;
  }) => {
    const { schema, errorHandler, defaults } = params;
    return new ZodServerSideProps(
      {
        ...(defaults ?? schemaDefaults),
        ...schema,
      },
      errorHandler
    );
  };
}
