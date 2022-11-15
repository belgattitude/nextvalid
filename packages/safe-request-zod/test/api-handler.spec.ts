import { HttpBadRequest } from '@belgattitude/http-exception';
import { z } from 'zod';
import { safeRequest } from '../src/getSafeRequest';

describe('Api handler tests', () => {
  describe('when request payload is valid', () => {
    it('should parse without error and return data', () => {
      const exampleRequest = {
        method: 'GET',
        query: {
          name: 'world',
          email: 'test@example.com',
        },
        headers: {
          accept:
            'text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8',
        },
        cookies: {},
      };
      const safeReq = safeRequest(exampleRequest);
      const { query, headers } = safeReq.parse({
        method: 'GET',
        query: {
          name: z.string(),
          email: z.string().email(),
        },
        headers: {
          accept: z.string().regex(/^text\/html/),
        },
      });
      expect(query).toStrictEqual(exampleRequest.query);
      expect(headers.accept).toStrictEqual(exampleRequest.headers.accept);
    });
  });
  describe('when request payload is invalid', () => {
    const invalidRequest = {
      method: 'GET',
      query: {
        email: 'world',
      },
    };
    const safeReq = safeRequest(invalidRequest);
    const schema = {
      method: 'GET',
      query: {
        email: z.string().email(),
      },
    };
    expect(() => safeReq.parse(schema)).toThrow(HttpBadRequest);
  });
});
