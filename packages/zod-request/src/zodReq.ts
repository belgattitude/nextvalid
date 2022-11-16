import type { NextApiRequest } from 'next';

import type {
  ParsableApiRequest,
  NextApiRequestSchema,
  HttpMethod,
} from './types';
import { ZodRequest } from './ZodRequest';

export const zodReq = <
  TSchema extends NextApiRequestSchema,
  TReq extends Partial<ParsableApiRequest> = NextApiRequest & {
    method: HttpMethod;
  }
>(
  req: TReq,
  schema: TSchema
) => {
  return new ZodRequest(req, schema);
};
