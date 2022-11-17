import {
  HttpBadRequest,
  HttpMethodNotAllowed,
} from '@belgattitude/http-exception';
import { z } from 'zod';
import type { HttpMethod } from '../src';
import type { TupleOfHttpMethods } from '../src/types';

describe('Refactor tests', () => {
  const stringToNumber = (arg: unknown) => {
    if (typeof arg === 'string') {
      const number = Number(arg);
      if (!isNaN(number)) {
        return number;
      }
    }
    return arg;
  };

  const testFn = (age: number) => {
    return age + 2;
  };

  // const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'TRACE'];
  type RequestSchema = {
    method:
      | Readonly<HttpMethod>
      | HttpMethod
      | Readonly<HttpMethod[]>
      | HttpMethod[];
    // z.ZodEnum<TupleOfHttpMethods>
    query: Record<string, z.ZodType>;
    headers: Record<string, z.ZodType>;
    cookies: Record<string, z.ZodType>;
  };

  interface ZodErrorRequestHandler {
    process: (error: z.ZodError) => void;
  }
  class HttpExceptionHandler implements ZodErrorRequestHandler {
    process = (error: z.ZodError) => {
      const methodError =
        error.issues.filter((issue) => issue.path?.[0] === 'method')?.[0] ??
        null;
      if (methodError) {
        throw new HttpMethodNotAllowed();
      }
      const queryError = error.issues.filter(
        (issue) => issue.path?.[0] === 'query'
      );
      if (queryError.length > 0) {
        throw new HttpBadRequest({
          message: queryError?.[0].message,
          cause: error,
        });
      }
    };
  }

  class ZodRequest<T extends RequestSchema> {
    constructor(
      private schema: T,
      private errorHandler?: ZodErrorRequestHandler
    ) {}
    parse = (
      req: Record<string, unknown>
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
  const mapRequestSchemaToZod = <T extends RequestSchema>(schema: T) => {
    const method = Array.isArray(schema.method)
      ? (schema.method as TupleOfHttpMethods)
      : ([schema.method] as TupleOfHttpMethods);
    return z.object({
      query: z.object<T['query']>(schema.query),
      method: z.enum(method),
      headers: z.object<T['headers']>(schema.headers),
      cookies: z.object<T['cookies']>(schema.cookies),
    });
  };

  type RequestSchemaWithoutMethod = Omit<RequestSchema, 'method'> & {
    method?: RequestSchema['method'] | undefined;
  };

  const zodReq = <
    S extends RequestSchemaWithoutMethod,
    R extends Record<string, unknown>
  >(
    schema: S,
    req: R
  ) => {
    const defaultMethod = 'GET';
    const defaults = {
      method: z.enum([defaultMethod]),
      headers: {},
      query: {},
      cookies: {},
    };
    return new ZodRequest({ ...defaults, ...schema }).parse({
      ...{ method: defaultMethod },
      ...req,
    });
  };

  it('should work', () => {
    const schema = {
      method: 'GET',
      query: {
        email: z.string().email(),
        statusCode: z.preprocess(stringToNumber, z.number().int().min(100)),
      },
      headers: {
        accept: z.string(),
      },
      cookies: {},
    } as const;

    const r = zodReq(schema, {
      query: {
        email: 'meexample.com',
        statusCode: '100',
      },
      headers: {
        accept: 'cool',
      },
      cookies: {},
    });

    // @ts-expect-error Want to do this
    testFn(r.query.email);
    r.method.includes('GET');

    expect(r.query.email).toStrictEqual('cool');
  });

  /*
  const results2 = safeParse(req, schema);

  results2.query.email;
  results2.query.statusCode;

  testFn(results2.query.statusCode);

  // @ts-expect-error Want to do this
  testFn(results2.query.email);

  testFn(Number.parseInt(results2.headers.accept));

   */
});
