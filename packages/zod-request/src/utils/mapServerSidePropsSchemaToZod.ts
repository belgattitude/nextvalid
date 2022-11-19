import { z } from 'zod';
import type { ServerSidePropsSchema, TupleOfHttpMethods } from '../types';

export const mapServerSidePropsSchemaToZod = <T extends ServerSidePropsSchema>(
  schema: T
) => {
  const method = Array.isArray(schema.method)
    ? (schema.method as TupleOfHttpMethods)
    : ([schema.method] as TupleOfHttpMethods);
  return z.object({
    method: z.enum(method),
    query: z.object<T['query']>(schema.query),
    headers: z.object<T['headers']>(schema.headers),
    cookies: z.object<T['cookies']>(schema.cookies),
  });
};
