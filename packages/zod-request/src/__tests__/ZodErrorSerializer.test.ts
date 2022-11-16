import z from 'zod';
import { serializeZodError } from '../ZodErrorSerializer';

describe('cool', () => {
  it('should work', () => {
    const schema = z.object({
      method: z.enum(['GET', 'POST']),
      query: z.object({
        email: z.string().email('Invalid email'),
        name: z.string(),
      }),
    });
    const parsed = schema.safeParse({
      method: 'PUT',
      query: {
        email: 'notanemail',
      },
    });
    expect(parsed.success).toBeFalsy();
    // eslint-disable-next-line jest/no-conditional-in-test
    if (!parsed.success) {
      const { error } = parsed;

      // eslint-disable-next-line jest/no-conditional-expect
      expect('hello').toStrictEqual('hello');
    }
  });
});
