import { z } from 'zod';
import type { ParsableApiRequest, RequestSchema } from './types';
import { ZodRequest } from './ZodRequest';

type RequestSchemaWithoutMethod = Omit<RequestSchema, 'method'> & {
  method?: RequestSchema['method'] | undefined;
};

export const zodReq = <
  R extends ParsableApiRequest,
  S extends Partial<RequestSchemaWithoutMethod>
>(
  req: R,
  schema: S
) => {
  const defaultMethod = 'GET';

  return new ZodRequest({
    ...{
      method: z.enum([defaultMethod]),
      headers: {},
      query: {},
      cookies: {},
    },
    ...schema,
  }).parse(hackForNextJsReq(req));
};

// Haven't had the time investigate this. If we send the req directly nextjs
// goes BOOM with a 500.
const hackForNextJsReq = (req: ParsableApiRequest): ParsableApiRequest => {
  return {
    method: req.method,
    headers: req.headers,
    query: req.query,
    cookies: req.cookies,
  };
};
