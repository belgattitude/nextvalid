import { z } from 'zod';
import { safeRequest } from '../src/getSafeRequest';

describe('Api handler tests', () => {
  describe('when request payload is valid', () => {
    it('should parse without error and return data', () => {
      const exampleRequest = {
        method: 'GET',
        query: {
          param1: 'world',
        },
        headers: {
          accept:
            'text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8',
        },
      };
      const safeReq = safeRequest(exampleRequest);
      const { query, headers } = safeReq.parse({
        method: 'GET',
        query: {
          param1: z.string(),
        },
        headers: {
          accept: z.string().regex(/^text\/html/),
        },
      });
      expect(query.param1).toStrictEqual(exampleRequest.query.param1);
      expect(headers.accept).toStrictEqual(exampleRequest.headers.accept);
    });
  });
});
