import { z } from 'zod';
import { zodGssp } from '../src';
import { createGsspContext } from './_helpers';

describe('zodGssp tests', () => {
  describe('when gssp context is valid', () => {
    it('should parse without error and return data', () => {
      const context = createGsspContext({
        req: {
          method: 'GET',
          headers: {
            authorization: 'Bearer <my_token>',
          },
          cookies: {},
        },
        query: {
          orderBy: 'levels',
        },
      });
      const schema = {
        method: 'GET',
        query: {
          orderBy: z.string(),
        },
        headers: {
          authorization: z.string().startsWith('Bearer'),
        },
      } as const;

      const {
        query,
        req: { method, cookies },
      } = zodGssp(schema).parse(context);
      expect(method).toStrictEqual(context.req.method);
      expect(query).toStrictEqual(context.query);
      expect(typeof query.orderBy).toStrictEqual('string');
      /*
      expect(headers.authorization).toStrictEqual(
        context.req.headers.authorization
      ); */
      expect(cookies).toStrictEqual({});
    });
  });
});
