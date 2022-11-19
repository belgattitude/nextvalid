import { expectTypeOf } from 'vitest';
import { z } from 'zod';
import { mapServerSidePropsSchemaToZod } from '../mapServerSidePropsSchemaToZod';

describe('mapServerSidePropsSchemaToZod', () => {
  it('should give the correct types', () => {
    const schema = {
      method: 'GET',
      query: {
        cool: z.string(),
      },
      cookies: {},
      headers: {
        authorization: z.string(),
      },
    } as const;
    const zodSchema = mapServerSidePropsSchemaToZod(schema);
    const parsed = zodSchema.parse({
      method: 'GET',
      query: {
        cool: 'hello',
      },
      cookies: {},
      headers: {
        authorization: 'Bearer: <token>',
      },
    });
    // Minimal typecheck
    // cause when an error occurs, it's hard to read
    // @link https://vitest.dev/guide/testing-types.html#reading-errors
    expect(typeof parsed.headers.authorization).toStrictEqual('string');
    expectTypeOf(parsed.headers.authorization).toEqualTypeOf<string>();

    // Full typecheck
    expectTypeOf(parsed).toMatchTypeOf<{
      method: string;
      headers: {
        authorization: string;
      };
      query: {
        cool: string;
      };
    }>();
  });
});
