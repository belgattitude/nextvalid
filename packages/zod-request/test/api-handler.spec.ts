import {
  HttpBadRequest,
  HttpMethodNotAllowed,
} from '@belgattitude/http-exception';
import type { ZodNumber } from 'zod';
import { z } from 'zod';
import type { RequestSchema } from '../src';
import { zodReq } from '../src';
import { giveMeANextJsRequest } from './_helpers';

describe('Api handler tests', () => {
  describe('when empty schema', () => {
    it('should validate based on default GET method', () => {
      const req = giveMeANextJsRequest({
        method: 'GET',
      });
      const { method } = zodReq(req, {
        // method: 'GET',
        cookies: {},
        query: {},
        headers: {},
      });
      expect(method).toStrictEqual('GET');
    });
    it('should throw HttpMethodNotAllowed is not GET', () => {
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

  describe('When using advanced types', () => {
    it('should work with preprocess and ZodEffects', () => {
      const req = giveMeANextJsRequest({
        query: {
          regexp: 'belgattitude',
          stringToInt: '100',
        },
      });

      const schema = {
        query: {
          regexp: z.string().regex(/belg/i),
          // stringToInt: z.preprocess(stringToNumber, z.number().int().min(100)),
          // stringToInt: z.preprocess(
          //  safePreprocessor(stringToNumberSchema(0)),
          //  z.number().min(100)
          // stringToInt: integerString(z.number().max(10).optional()),
          stringToInt: z.preprocess((input) => {
            const processed = z
              .string()
              .regex(/^\d+$/)
              .transform(Number)
              .safeParse(input);
            return processed.success ? processed.data : input;
          }, z.number().min(0)),
        },
      } as const;

      const { query } = zodReq(req, schema as unknown as RequestSchema);
      expect(query.stringToInt).toStrictEqual(100);
      expect(typeof query.stringToInt).toStrictEqual('number');
      expect(query.regexp).toStrictEqual(req.query.regexp);
    });
  });
});
