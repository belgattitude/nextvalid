import type { ParsableRequest } from '../../src/types';

export const giveMeANextJsRequest = (
  req: Partial<ParsableRequest>
): ParsableRequest => {
  return {
    ...({
      method: 'GET',
      query: {},
      cookies: {},
      headers: {},
    } as ParsableRequest),
    ...req,
  };
};
