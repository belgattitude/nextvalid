import type { NextApiRequest } from 'next';
import type {
  ParsableApiRequest,
  NextApiRequestSchema,
  HttpMethod,
} from './types';
import { ZodRequest } from './ZodRequest';

export const zodReq = <
  TSchema extends Partial<NextApiRequestSchema>,
  TReq extends Partial<ParsableApiRequest> = NextApiRequest & {
    method: HttpMethod | string;
  }
>(
  req: TReq,
  schema: TSchema
) => {
  const defaultSchema = {
    headers: {},
    query: {},
    method: 'GET',
    cookies: {},
  } as const;
  const s = { ...defaultSchema, ...schema };

  return new ZodRequest(req, s);
};
