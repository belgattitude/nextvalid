import { expectTypeOf } from 'vitest';
import { z } from 'zod';
import { zodReq } from '../src';
import { giveMeANextJsRequest } from './_helpers';

describe('Type expectations', () => {
  describe('zodRequest', () => {
    it('should pass types and runtime checks', () => {
      const req = giveMeANextJsRequest({
        query: {
          regexp: 'belgattitude',
          stringToInt: '100',
          partOfEnum: 'TO_BE',
        },
        headers: {
          host: 'https://something.be/fr',
        },
        cookies: {
          userLocale: 'en',
        },
      });

      const validated = zodReq(req, {
        method: 'GET',
        query: {
          regexp: z.string().regex(/belg/i),
          stringToInt: z.preprocess((input) => {
            const processed = z
              .string()
              .regex(/^\d+$/)
              .transform(Number)
              .safeParse(input);
            return processed.success ? processed.data : input;
          }, z.number().min(0)),
          partOfEnum: z.enum(['TO_BE', 'TO_HAVE', 'TO_DO']),
        },
        headers: {
          host: z.string().url(),
        },
        cookies: {
          userLocale: z.string().optional(),
        },
      });

      // Types
      expectTypeOf(validated).toMatchTypeOf<{
        method: string;
        query: {
          regexp: string;
          stringToInt: number;
          partOfEnum: string;
        };
        headers: {
          host: string;
        };
        cookies: {
          userLocale?: string;
        };
      }>();

      // Runtime

      expect(validated.method).toStrictEqual('GET');

      const { regexp, stringToInt, partOfEnum } = validated.query;
      expect(typeof stringToInt).toStrictEqual('number');
      expect(typeof regexp).toStrictEqual('string');
      expect(typeof partOfEnum).toStrictEqual('string');

      const { userLocale } = validated.cookies;
      expect(typeof userLocale).toStrictEqual('string');

      const { host } = validated.headers;
      expect(typeof host).toStrictEqual('string');
    });
  });
});
