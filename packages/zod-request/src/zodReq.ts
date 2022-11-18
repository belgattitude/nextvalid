import type { IErrorHandler } from './error';
import type { ParsableApiRequest, ApiRequestSchema } from './types';
import { ZodRequest } from './ZodRequest';

export const zodReq = <
  R extends ParsableApiRequest,
  S extends Partial<ApiRequestSchema>
>(
  schema: S,
  errorHandler?: IErrorHandler
) => {
  return ZodRequest.create({ schema, errorHandler });
};

// Haven't had the time investigate this. If we send the req directly nextjs
// goes BOOM with a 500.
const hackForNextJsReq = (req: ParsableApiRequest): ParsableApiRequest => {
  return {
    method: req.method ?? 'GET',
    headers: req.headers,
    query: req.query,
    cookies: req.cookies,
  };
};
