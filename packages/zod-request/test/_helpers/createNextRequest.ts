import type { ParsableRequest } from '../../src';

export const createNextRequest = (
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
