import type { NextApiRequest } from 'next';
import { SafeRequest } from './SafeRequest';
import type { ParsableApiRequest } from './types';

export const safeRequest = <
  TReq extends Partial<ParsableApiRequest> = NextApiRequest
>(
  req: TReq
) => {
  return new SafeRequest(req);
};
