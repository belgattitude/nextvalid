import { z } from 'zod';
import type { ServerSidePropsSchema, TupleOfHttpMethods } from '../types';

export const mapServerSidePropsSchemaToZod = <T extends ServerSidePropsSchema>(
  schema: T
) => {
  const method = Array.isArray(schema.req.method)
    ? (schema.req.method as TupleOfHttpMethods)
    : ([schema.req.method] as TupleOfHttpMethods);
  return z.object({
    query: z.object<T['query']>(schema.query),
    req: z.object({
      method: z.enum(method),
      headers: z.object<T['req']['headers']>(schema.req.headers),
      cookies: z.object<T['req']['cookies']>(schema.req.cookies),
    }),
  });
};
