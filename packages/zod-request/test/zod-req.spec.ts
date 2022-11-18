import {
  HttpBadRequest,
  HttpMethodNotAllowed,
} from '@belgattitude/http-exception';
import type { ZodNumber } from 'zod';
import { z } from 'zod';
import type { RequestSchema } from '../src';
import { zodReq } from '../src';
import { giveMeANextJsRequest } from './_helpers';

describe('zodReq tests', () => {
  describe('when empty schema si given', () => {
    it('should default to GET method', () => {
      const req = giveMeANextJsRequest({
        method: 'GET',
      });
      const { method } = zodReq(req, {});
      expect(method).toStrictEqual('GET');
    });
    it('should throw HttpMethodNotAllowed is not default GET', () => {
      const req = giveMeANextJsRequest({
        method: 'POST',
      });
      expect(() => zodReq(req, {})).toThrow(HttpMethodNotAllowed);
    });
  });

  describe('when request payload is valid', () => {
    it('should parse without error and return data', () => {
      const req = giveMeANextJsRequest({
        method: 'GET',
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

      const { query, headers, cookies, method } = zodReq(req, schema);
      expect(method).toStrictEqual(req.method);
      expect(query).toStrictEqual(req.query);
      expect(typeof query.email).toStrictEqual('string');
      expect(headers.authorization).toStrictEqual(req.headers.authorization);
      expect(cookies).toStrictEqual({});
    });
  });

  describe('when method is not within allowed ones', () => {
    it('should throw HttpMethodNotAllowed', () => {
      expect(() => {
        zodReq(
          giveMeANextJsRequest({
            method: 'PATCH',
          }),
          {
            method: ['GET', 'POST'],
          }
        );
      }).toThrow(HttpMethodNotAllowed);
    });
  });

  describe('when method is invalid', () => {
    it('should throw HttpMethodNotAllowed', () => {
      expect(() =>
        zodReq(
          giveMeANextJsRequest({
            method: 'POST',
          }),
          {
            method: 'GET',
          }
        )
      ).toThrow(HttpMethodNotAllowed);
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
      expect(() =>
        zodReq(req, {
          method: 'GET',
          query: {
            email: z.string().email('Invalid email'),
          },
        })
      ).toThrow(HttpBadRequest);
    });
  });
});
