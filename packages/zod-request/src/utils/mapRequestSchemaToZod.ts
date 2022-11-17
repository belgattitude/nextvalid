import { z } from 'zod';
import type { RequestSchema, TupleOfHttpMethods } from '../types';

export const mapRequestSchemaToZod = <T extends RequestSchema>(schema: T) => {
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
