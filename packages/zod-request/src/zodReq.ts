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
  }).parse({
    ...req,
  });
};
