import type { ZodSchema, ZodEnum, ZodObject, ZodType } from 'zod';
import { z } from 'zod';
import type {
  RequestSchema,
  ParsableApiRequest,
  TupleOfHttpMethods,
} from './types';

const defaultMethod = 'GET';

export const createSchema = <T extends RequestSchema>(
  schema: T
): ZodObject<{
  // method: ZodEnum<T['method'] extends TupleOfHttpMethods ? T['method'] : [T['method']]>;
  method: ZodEnum<TupleOfHttpMethods>;
  // query: z.infer<ReturnType<typeof createPlainObject<T['query']>>>;
  query: T['query'] extends undefined
    ? ZodSchema<Record<string, unknown>>
    : ZodSchema<T['query']>;
  headers: T['headers'] extends undefined
    ? ZodSchema<Record<string, unknown>>
    : ZodSchema<T['headers']>;
  cookies: T['cookies'] extends undefined
    ? ZodSchema<Record<string, unknown>>
    : ZodSchema<T['cookies']>;
}> => {
  const { query, cookies, headers, method = defaultMethod } = schema;

  return z.object({
    method: z.enum(
      (typeof method === 'string' ? [method] : method) as TupleOfHttpMethods
    ),
    query: query !== undefined ? z.object(query) : z.object({}),
    headers: headers !== undefined ? z.object(headers) : z.object({}),
    cookies: cookies !== undefined ? z.object(cookies) : z.object({}),
  });
};
