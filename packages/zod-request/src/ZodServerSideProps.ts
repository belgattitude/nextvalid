import type { z } from 'zod';
import type { IErrorHandler } from './error';
import { HttpExceptionHandler } from './error';
import type { ParsableGsspContext, ServerSidePropsSchema } from './types';
import { mapServerSidePropsSchemaToZod } from './utils';

const schemaDefaults = {
  req: {
    method: 'GET',
    cookies: {},
    headers: {},
  },
  query: {},
  locale: undefined,
} as const;

export class ZodServerSideProps<T extends ServerSidePropsSchema> {
  constructor(
    public readonly schema: T,
    private errorHandler?: IErrorHandler
  ) {}
  parse = (
    context: ParsableGsspContext
  ): z.infer<ReturnType<typeof mapServerSidePropsSchemaToZod<T>>> => {
    const all = mapServerSidePropsSchemaToZod<T>(this.schema);
    const result = all.safeParse(context);
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
    const { req = defaults?.req ?? schemaDefaults.req } = schema;
    const { query = defaults?.query ?? schemaDefaults.query } = schema;
    return new ZodServerSideProps(
      {
        req: { ...req, ...schema.req },
        query,
      },
      errorHandler
    );
  };
}
