import { expectTypeOf } from 'vitest';
import { z } from 'zod';
import { zodGssp } from '../src';
import { createGsspContext } from './_helpers';

describe('zodGssp type expectations', () => {
  it('should pass types and runtime checks', () => {
    const req = createGsspContext({
      query: {
        regexp: 'belgattitude',
        stringToInt: '100',
        partOfEnum: 'TO_BE',
      },
      req: {
        headers: {
          host: 'https://something.be/fr',
        },
        cookies: {
          userLocale: 'en',
        },
      },
    });

    const schema = {
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
    };

    const validated = zodGssp(schema).parse(req);

    // Minimal typecheck
    // cause when an error occurs, it's hard to read
    // @link https://vitest.dev/guide/testing-types.html#reading-errors
    expectTypeOf(validated.query.stringToInt).toEqualTypeOf<number>();

    // Full schema typechecks
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
