import type { IncomingHttpHeaders, IncomingMessage } from 'node:http';
import type { NextApiRequest } from 'next';
import type { ZodSchema } from 'zod';
import type { httpMethods } from './httpMethods';

export type HttpMethod = typeof httpMethods[number];
export type HttpMethods = typeof httpMethods;

export type TupleOfHttpMethods = [HttpMethod, ...HttpMethod[]];

/**
 * Well-know headers that aren't specifically covered by @types/node IncomingHttpHeaders
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

export type NextApiRequestSchema = {
  method: HttpMethod | [HttpMethod];
  query?: Record<string, ZodSchema>;
  cookies?: Record<string, ZodSchema>;
  headers?: Record<IncomingHttpHeadersKeys | string, ZodSchema>;
};

export type ParsableApiRequest = Pick<
  NextApiRequest,
  'query' | 'cookies' | 'headers'
> &
  Pick<IncomingMessage, 'url'> & { method: HttpMethod };
