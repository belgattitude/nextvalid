import {
  HttpBadRequest,
  HttpMethodNotAllowed,
} from '@belgattitude/http-exception';
import { z } from 'zod';
import { zodReq } from '../src';
import { giveMeANextJsRequest } from './_helpers';

describe('Api handler tests', () => {
  describe('when empty schema', () => {
    it('should validate based on default GET method', () => {
      const req = giveMeANextJsRequest({
        method: 'GET',
      });
      const { method } = zodReq(req, {}).parse();
      expect(method).toStrictEqual('GET');
    });
    it('should throw HttpMethodNotAllowed is not GET', () => {
      const req = giveMeANextJsRequest({
        method: 'POST',
      });
      expect(() => zodReq(req, {}).parse()).toThrow(HttpMethodNotAllowed);
    });
  });

  describe('when request payload is valid', () => {
    it('should default to GET method', () => {});
    it('should parse without error and return data', () => {
      const req = giveMeANextJsRequest({
        query: {
          name: 'belgattitude',
          email: 'test@example.com',
        },
        headers: {
          authorization: 'Bearer <my_token>',
        },
      });
      const schema = {
        method: 'GET',
        query: {
          name: z.string(),
          email: z.string().email(),
        },
        headers: {
          authorization: z.string().startsWith('Bearer'),
        },
      } as const;

      const { query, headers, cookies, method } = zodReq(req, schema).parse();
      expect(method).toStrictEqual(req.method);
      expect(query).toStrictEqual(req.query);
      expect(headers.authorization).toStrictEqual(req.headers.authorization);
      expect(cookies).toStrictEqual({});
    });
  });

  describe('when method is not within allowed ones', () => {
    it('should throw HttpMethodNotAllowed', () => {
      const zr = zodReq(
        giveMeANextJsRequest({
          method: 'PATCH',
        }),
        {
          method: ['GET', 'POST'],
        }
      );
      expect(() => zr.parse()).toThrow(HttpMethodNotAllowed);
    });
  });

  describe('when method is invalid', () => {
    it('should throw HttpMethodNotAllowed', () => {
      const zr = zodReq(
        giveMeANextJsRequest({
          method: 'POST',
        }),
        {
          method: 'GET',
        }
      );
      expect(() => zr.parse()).toThrow(HttpMethodNotAllowed);
    });
  });

  describe('when query params are invalid', () => {
    it('should throw HttpBadRequest', () => {
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
