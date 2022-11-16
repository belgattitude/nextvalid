import type { ZodObject, ZodSchema } from 'zod';
import { z } from 'zod';
import type { NextApiRequestSchema } from './types';

export const createSchema = <T extends NextApiRequestSchema>(
  schema: T
): ZodObject<{
  method: ZodSchema<T['method']>;
  // query: ZodSchema<T['query']>;
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
  const { query, cookies, headers, method } = schema;
  return z.object({
    method: z.string(),
    query: query !== undefined ? z.object(query) : z.object({}),
    headers: headers !== undefined ? z.object(headers) : z.object({}),
    cookies: cookies !== undefined ? z.object(cookies) : z.object({}),
  });
};
