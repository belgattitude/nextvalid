import type { ParsableApiRequest } from '../../src';

export const giveMeANextJsRequest = (
  req: Partial<ParsableApiRequest>
): ParsableApiRequest => {
  return {
    ...({
      method: 'GET',
      query: {},
      cookies: {},
      headers: {},
    } as ParsableApiRequest),
    ...req,
  };
};
