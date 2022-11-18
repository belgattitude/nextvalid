import { z } from 'zod';
import type { ParsableApiRequest, RequestSchema } from './types';
import { ZodRequest } from './ZodRequest';

type RequestSchemaWithoutMethod = Omit<RequestSchema, 'method'> & {
  method?: RequestSchema['method'] | undefined;
};

const defaults = {
  method: 'GET',
  headers: {},
  query: {},
  cookies: {},
};

export const zodReq = <
  R extends ParsableApiRequest,
  S extends Partial<RequestSchema>
>(
  req: R,
  schema: S
) => {
  return new ZodRequest({
    ...defaults,
    ...schema,
  }).parse(hackForNextJsReq(req));
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
