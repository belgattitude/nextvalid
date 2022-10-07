import { z } from 'zod';
import { safeRequest } from '../src/getSafeRequest';

describe('Api handler tests', () => {
  it('should work as expected', () => {
    const req = {
      method: 'GET',
      query: {
        hello: 'world',
      },
      headers: {},
      cookies: {},
    };
    const safeReq = safeRequest(req);
    const { query } = safeReq.parse({
      method: 'GET',
      query: {
        hello: z.string(),
      },
    });
    const { hello } = query;
    expect(hello).toStrictEqual(req.query.hello);
  });
});
