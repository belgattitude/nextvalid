import type { IncomingHttpHeaders, IncomingMessage } from 'node:http';
import type { NextApiRequest } from 'next';
import type { ZodType, z } from 'zod';
import type { httpMethods } from './constants';
import type { mapRequestSchemaToZod } from './utils';
import type { ZodRequest } from './ZodRequest';

export type HttpMethod = typeof httpMethods[number];
export type HttpMethods = typeof httpMethods;

export type TupleOfHttpMethods = [HttpMethod, ...HttpMethod[]];

/**
 * Well-known headers that aren't specifically covered by @types/node IncomingHttpHeaders
 */
interface AdditionalRequestHeaders {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
   */
  authorization: string;
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Request_header
 */
export type IncomingHttpHeadersKeys =
  | keyof AdditionalRequestHeaders
  | keyof IncomingHttpHeaders;

/**
 * Schema for validating api routes requests (a.k.a NextApiRequest)
 */
export type ApiRequestSchema = {
  // till typescript 4.9 `satisfies` is widely used, keep the union with string
  // that avoids using `as const` when extracting a schema
  method: HttpMethod | HttpMethod[] | string;
  query: Record<string, ZodType>;
  headers: Record<IncomingHttpHeadersKeys | string, ZodType>;
  cookies: Record<string, ZodType>;
};

export type ParsableApiRequest = Pick<
  NextApiRequest,
  'query' | 'cookies' | 'headers'
> &
  Pick<IncomingMessage, 'url'> & { method?: HttpMethod | string | undefined };

export type InferReqSchema<T extends Partial<ApiRequestSchema>> = z.infer<
  ReturnType<
    typeof mapRequestSchemaToZod<{
      method: ApiRequestSchema['method'];
      query: T['query'] extends undefined
        ? Record<string, never>
        : NonNullable<T['query']>;
      cookies: T['cookies'] extends undefined
        ? Record<string, never>
        : NonNullable<T['cookies']>;
      headers: T['headers'] extends undefined
        ? Record<string, never>
        : NonNullable<T['headers']>;
    }>
  >
>;

export type InferZodRequest<
  ZR extends ZodRequest<ApiRequestSchema>,
  T = ZR['schema']
> = z.infer<
  ReturnType<
    typeof mapRequestSchemaToZod<{
      method: ApiRequestSchema['method'];
      query: T['query'] extends undefined
        ? Record<string, never>
        : NonNullable<T['query']>;
      cookies: T['cookies'] extends undefined
        ? Record<string, never>
        : NonNullable<T['cookies']>;
      headers: T['headers'] extends undefined
        ? Record<string, never>
        : NonNullable<T['headers']>;
    }>
  >
>;
