import type {
  mapRequestSchemaToZod,
  ApiRequestSchema,
} from '@happy-next/zod-request';
import { zodReq } from '@happy-next/zod-request';

import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withApiErrorHandler } from '@/backend';
import { ConsoleLogger } from '@/lib';

const schema = {
  method: 'GET',
  query: {
    name: z.string().min(3).max(80),
    email: z.string().email('Invalid email').optional(),
  },
} as const;

type RequestSchemaInfer<T extends Partial<ApiRequestSchema>> = z.infer<
  ReturnType<
    typeof mapRequestSchemaToZod<{
      method: ApiRequestSchema['method'];
      query: T['query'] extends undefined
        ? Record<string, never>
        : NonNullable<T['query']>;
      cookies: T['cookies'] extends undefined
        ? Record<string, never>
        : NonNullable<T['cookies']>;
      headers: T['headers'] extends undefined
        ? Record<string, never>
        : NonNullable<T['headers']>;
    }>
  >
>;

type QuerySchema = RequestSchemaInfer<typeof schema>['query'];
const e: QuerySchema = {
  name: 'hello',
  email: 'seb',
};

// Try it out http://localhost:3000/api/basic/Guillermo?email=me@example.com
const basicHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsed = zodReq(req, schema);
  const { name, email } = parsed.query;
  res.json({
    title: `Greetings ${name.toUpperCase()} !`,
    email: email ? `Your email is ${email}` : `No email provided`,
  });
};

export default withApiErrorHandler({
  logger: new ConsoleLogger(),
})(basicHandler);
