import { HttpBadRequest } from '@belgattitude/http-exception';
import { z } from 'zod';
import { zodReq } from '../src';
import { giveMeANextJsRequest } from './_helpers';

describe('Api handler tests', () => {
  describe('when request payload is valid', () => {
    it('should parse without error and return data', () => {
      const req = giveMeANextJsRequest({
        query: {
          name: 'world',
          email: 'test@example.com',
        },
        headers: {
          accept:
            'text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8',
        },
      });
      const schema = {
        method: 'GET',
        query: {
          name: z.string(),
          email: z.string().email(),
        },
        headers: {
          accept: z.string().regex(/^text\/html/),
        },
      };

      const { query, headers } = zodReq(req, schema).parse();
      expect(query).toStrictEqual(req.query);
      expect(headers.accept).toStrictEqual(req.headers.accept);
    });
  });
  describe('when request payload is invalid', () => {
    const req = giveMeANextJsRequest({
      query: {
        email: 'world',
      },
    });
    const schema = {
      method: 'GET',
      query: {
        email: z.string().email(),
      },
    };
    const zr = zodReq(req, schema);
    expect(() => zr.parse()).toThrow(HttpBadRequest);
  });
});
