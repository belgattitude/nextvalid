import type { ParsableApiRequest, ApiRequestSchema } from './types';
import { ZodRequest } from './ZodRequest';

export const zodReq = <
  R extends ParsableApiRequest,
  S extends Partial<ApiRequestSchema>
>(
  req: R,
  schema: S
) => {
  return ZodRequest.withSchemaDefaults(schema).parse(hackForNextJsReq(req));
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
