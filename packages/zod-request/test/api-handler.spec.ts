import {
  HttpBadRequest,
  HttpMethodNotAllowed,
} from '@belgattitude/http-exception';
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
      } as const;

      const { query, headers, cookies, method } = zodReq(req, schema).parse();
      expect(method).toStrictEqual(req.method);
      expect(query).toStrictEqual(req.query);
      expect(headers.accept).toStrictEqual(req.headers.accept);
      expect(cookies).toStrictEqual({});
    });
  });
  describe('when method is invalid', () => {
    it('should throw HttpMethodNotAllowed', () => {
      const zr = zodReq(
        giveMeANextJsRequest({
          method: 'POST',
        }),
        {
          method: ['GET'],
        }
      );
      expect(() => zr.parse()).toThrow(HttpMethodNotAllowed);
    });
  });
  describe('when query params are invalid', () => {
    it('should throw HttpMethodNotAllowed', () => {
      const req = giveMeANextJsRequest({
        method: 'GET',
        query: {
          email: 'invalid-email.com',
        },
      });
      const zr = zodReq(req, {
        method: 'GET',
        query: {
          email: z.string().email('Invalid email'),
        },
      });
      expect(() => zr.parse()).toThrow(HttpBadRequest);
    });
  });
});
